import { Request, Response } from "express";
import services from "../services";

import { newUser } from "../protocols/protocols";
import { StatusCodes } from "http-status-codes";



function random (min: number, max: number)
{
	return Math.round( Math.random() * (max - min) + min );
}

class Auth {
    async auth_register (req: Request, res: Response)
    {
        const { data } = res.locals;

            const newUserObj = data as newUser;
            const query = await services.createAccount(newUserObj.account_name, newUserObj.password, newUserObj.nickname);
            if(!query) throw Error();

            return res.status(StatusCodes.CREATED).send(query);
    }
    async auth_login (req: Request, res: Response)
    {
        const { data } = res.locals;
        const query = await services.doSessionToken(data.userId)

        return res.status(StatusCodes.OK).send({
            token: query,
            userInfos: {
                account_name: data.result.account_name,
                nickname: data.result.nickname,
                diamonds: data.result.diamonds,
                peanuts: data.result.peanuts,
            }
        });
    }
    async auth_session (req: Request, res: Response)
    {
        const { user } = res.locals;
        const query = await services.getByUserId(user.userId);
        if(query){
            const queryWhioutPassword = {
                id: query.id,
                account_name: query.account_name,
                diamonds: query.diamonds,
                peanuts: query.peanuts,
                nickname: query.nickname,
            }
            return res.status(StatusCodes.OK).send(queryWhioutPassword);
        }
    }
}
class Users {

    async user_getUserIdols (req: Request, res: Response)
    {
        const { user } = res.locals;

        try 
        {
            const query = await services.getInventory(user.userId);
            const filterNoMarket = query?.filter( el => el.market === null )
            
            res.status(StatusCodes.OK).send(filterNoMarket);
        } 
        catch (err) 
        {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        } 
    }
}
class Tools  {
    async doWork (req: Request, res: Response) {
        const { user } = res.locals; 

        try{
            const query = await services.doWork(user.userId);

            if(!query){
                return res.sendStatus(StatusCodes.NOT_FOUND);
            }

            return res.status(StatusCodes.OK).send(query);  
        } catch (err) {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
    async doGacha (req: Request, res: Response) {
        const { user } = res.locals; 

        try{
            const query = await services.doGacha(user.userId);

            if(!query){
                return res.sendStatus(StatusCodes.NOT_FOUND);
            }

            return res.status(StatusCodes.OK).send(query);  
        } catch (err) {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
    async getAllIdols (req: Request, res: Response) {
        try {
            const { data } = res.locals;
        
            const page: number = Number(data.page || 1);
            const idol_id: number = Number(data.idol_id || 0);
            const idol_name: string = String(data.idol_name || "");
            
            const query = await services.getDataIdols(page, idol_id, idol_name);

            return res.status(StatusCodes.OK).send(query);
            
        } catch (err) {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
}
class Market {
    async getMarket(req: Request, res: Response){
        try {
            const { user } = res.locals;
            const { body } = req;
        
            const page: number = Number(body.page || 1);
            const idol_name: string = String(body.idol_name || "");
            
            const result = await services.getAllMarket(page, idol_name);
            
            console.log(result);
            
            return res.status(StatusCodes.OK).send(result);
            
        } catch (err) {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
    async buyIdolMarket(req: Request, res: Response){

        const { data } = res.locals;
        const { marketId } = req.body;
        const idNumber: number = Number(marketId);

        try {
            if(isNaN(idNumber)) throw new Error("ID not is a Number");

            const result = await services.buyMarket(data, idNumber);

            if(result === null) throw new Error("Error on buy idol");
            if(result === false) {
                return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not enough peanuts");
            }
            return res.status(StatusCodes.OK).send(result);

        } catch (err) {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
    async addIdolMarket(req: Request, res: Response){

        const { data } = res.locals;
        const { idolId } = req.body;
        const idNumber: number = Number(idolId);

        try {
            if(isNaN(idNumber)) throw new Error("ID not is a Number");

            const result = await services.buyMarket(data, idNumber);

            if(result === null) throw new Error("Error on buy idol");
            if(result === false) {
                return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not enough peanuts");
            }
            return res.status(StatusCodes.OK).send(result);

        } catch (err) {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
}

const controller = {
    auth: new Auth(),
    users: new Users(),
    tools: new Tools(),
    market: new Market()
};

export default controller;