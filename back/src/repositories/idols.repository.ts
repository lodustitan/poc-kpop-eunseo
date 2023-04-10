import prisma from "../database/database";

async function changeOwner (idol_id: number, new_owner: number) {
    try {

        const query = await prisma.idols.update({where: {id: idol_id} , data: {user_id: new_owner}}); 
        return {status: true, result: query};    
    
    } catch (err) { return {status: false, result: null};
    } finally { await prisma.$disconnect() }
}
async function create (name: string, image_url: string, type: string, user_id: number, rarity: number) {
    try {

        const query = await prisma.idols.create({data: {name, image_url, type, rarity, user_id}}); 
        return {status: true, result: query};    
    
    } catch (err) { return {status: false, result: null};
    } finally { await prisma.$disconnect() }
}
async function deleteById (id: number) {
    try {

        const query = await prisma.idols.delete({where: {id}}); 
        return {status: true, result: query};    
    
    } catch (err) {return {status: false, result: null};
    } finally { await prisma.$disconnect() }
}
async function getAllIdols (user_id: number) {
    try 
    {
        const query = await prisma.idols.findMany({where: {user_id: user_id}, include: { market: true}});
        return {status: true, result: query};

    } catch (err) {return {status: false, result: null};
    } finally { await prisma.$disconnect() }
}

export const idolsRepository = {
    changeOwner,
    create,
    deleteById,
    getAllIdols,
} 