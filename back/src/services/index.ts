import { 
    idolsRepository,
    marketRepository,
    sessionsRepository,
    usersRepository
} from "../repositories";

import { newUser } from "../protocols/protocols";
import data from "../assets/idols.json";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

class Services {
    async getDataIdols(page: number, idol_id: number, idol_name: string) {
        const pageLimit = 15;
        const pageOffset = page || 1;

        let filtered = [...data.idols];

        if(idol_id !== 0){
            filtered = filtered.filter(el => el.idol_id === idol_id);
        }
        if(idol_name !== ""){
            filtered = filtered.filter(el => (el.name.toLowerCase()).includes(idol_name.toLowerCase()));
        }
        
        const arrPage = filtered.splice((pageOffset-1)*pageLimit, pageOffset*pageLimit); 
        return arrPage;
    }
    async createAccount(userAccountName: string, userPassword: string, userNickname: string){
        try{
            const hashPassword = await bcrypt.hash(userPassword, 10);
            const verify_exist = await usersRepository.create(userAccountName, hashPassword, userNickname);  

            return verify_exist;
        } catch (err) {
            return null;
        }
    }
    async getInventory(userId: number){
        try{
            const account = await this.getByUserId(userId);
            if(account) {
                
                const query = await idolsRepository.getAllIdols(account.id);

                if(query.result){ return query.result }
            }
            else throw new Error();
        } catch (err) {
            return null;
        }
    }
    async getByUserId(userId: number){
        try{
            const verify_exist = await usersRepository.getById(userId);
            if(verify_exist.status) {
                return verify_exist.result;
            } else {
                throw new Error();
            }
        } catch (err) {
            return null;
        }
    }
    async addCashById(userId: number, value: number){
        try{
            if(value < 0) return null;

            const account = await this.getByUserId(userId);
            if(account) {
                const query = await usersRepository.setCashById(account.id, account.peanuts + value)
                if(query.result){
                    return query.result
                }
            }
            else {            
                throw new Error();
            }
        } catch (err) {
            return null;
        }
    }
    async removeCashById(userId: number, value: number){
        try{
            if(value < 0) return null;

            const account = await this.getByUserId(userId);
            if(account) {
                const query = await usersRepository.setCashById(account.id, account.peanuts - value)
                if(query.result){
                    return query.result
                }
            }
            else { 
                throw new Error();
            }
        } catch (err) {
            return null;
        }
    }
    async doGacha(userId: number){
        try {
            const account = await this.getByUserId(userId);
            if(account) {
                
                const random_idol = data.idols[Math.floor(Math.random() * data.idols.length)]
                const query = await idolsRepository.create(random_idol.name, random_idol.image_url, random_idol.type, account.id, random_idol.rarity)
                await usersRepository.setCashById(account.id, account.peanuts - 100)
                
                if(query.result){
                    return query.result
                }
            }
            throw new Error();
        } catch (err) {
            return null;
        }
    }
    async doWork(userId: number){
        try {
            const account = await this.getByUserId(userId);
            if(account) {
                
                await this.addCashById(account.id, 100);
                return true;
            }
            throw new Error();
        } catch (err) {
            return null;
        }
    }
    async getAllMarket(page: number, idol_name: string) {
        try {
            const query = await marketRepository.getAll(page, idol_name);
            return query;
                
        } catch (err) {
            return null
        }
    }
    async buyMarket(userId: number, id: number) {
        try {
            
            const account = await this.getByUserId(userId);
            if(account) {
                const idolMarket = await marketRepository.getByMarketID(id);
                
                if(idolMarket.result){
                    if(idolMarket.result.id && account.peanuts >= idolMarket.result.price){
                        await idolsRepository.changeOwner(idolMarket.result.id, account.id);
                        await this.removeCashById(account.id, idolMarket.result.price);
                        return true;
                    } 
                }
                return false;
            }
            throw new Error();
        } catch (err) {
            return null
        }
    }
    async sellMarket(userId: number, id: number, price: number) {
        try {
            
            const account = await this.getByUserId(userId);
            if(account) {
                const idolMarket = await marketRepository.getByMarketID(id);
                
                if(!idolMarket.result){
                    await marketRepository.addToMarket(account.id, id, price);
                    return true;
                }
                return false;
            }
            throw new Error();
        } catch (err) {
            return null
        }
    }

    async doSessionToken(userId: number) {
        try {
            const account = await this.getByUserId(userId);
            if(account) {
                const secret = process.env.JWT_PASS || "supersecretpassword";
                const session = await sessionsRepository.getSessionByUserId(userId);

                if(session) {
                    // const decodedJWT = jwt.verify(session.token, secret);

                    await sessionsRepository.deleteSessionByUserId(userId);
                    const newToken = jwt.sign({ userId }, secret, { expiresIn: "2 days" });
                    await sessionsRepository.createSession(newToken, account.id);
                    return newToken;

                } else {
                    const newToken = jwt.sign({ userId }, secret, { expiresIn: "2 days" });
                    await sessionsRepository.createSession(newToken, account.id);
                    return newToken;
                }

            }
        } catch (err) {
            console.error(err);
        }
    }
}

const services = new Services();

export default services;