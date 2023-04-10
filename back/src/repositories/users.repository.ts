import prisma from "../database/database";

async function create (userAccountName: string, userPassword: string, userNickname: string)  {
    try {

        const query = await prisma.users.create({data: {
            account_name: userAccountName,
            password: userPassword,
            nickname: userNickname
        }});
        return {status: true, result: query};

    } catch (err){ return {status: false, result: null};   
    } finally { await prisma.$disconnect() }
}
async function deleteById (id: number) {
    try {

        const query = await prisma.users.delete({where: {id}});
        return {status: true, result: query};   

    } catch (err) { return {status: false, result: null}; 
    } finally { await prisma.$disconnect() }
}
async function getAll () {
    try {

        const query = await prisma.users.findMany({select: {nickname: true}}); 
        return {status: true, result: query};

    } catch (err) { return {status: false, result: null};
    } finally { await prisma.$disconnect() }
}
async function getByAccountName (account_name: string) {
    try {
        
        const query = await prisma.users.findFirst({where: {account_name}});
        return { status: true, result: query };

    } catch (err) { return { status: false, result: null };
    } finally { await prisma.$disconnect() }
}
async function getById (id: number) {
    try {

        const query = await prisma.users.findFirst({where: {id}})
        return {status: true, result: query};    
    
    } catch (err) { return {status: false, result: null};
    } finally { await prisma.$disconnect() }
}
async function getByNickname (name: string) {
    try {
        
        const query = await prisma.users.findFirst({where: {nickname: name}});
        return {status: true, result: query};  

    } catch (err) { return {status: false, result: null};
    } finally { await prisma.$disconnect() }
}
async function setCashById (id: number, value: number) {
    try {

        const query = await prisma.users.update({data: {peanuts: value}, where: {id}});
        return {status: true, result: query};  

    } catch (err) { return {status: false, result: null};
    } finally { await prisma.$disconnect() }
}
export const usersRepository = {
    create,
    deleteById,
    getAll,
    getByAccountName,
    getById,
    getByNickname,
    setCashById
}