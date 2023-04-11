import prisma from "../database/database";

async function getAll (page: number, idol_name: string) {
    try {
        let query;
        if(idol_name){
            query = await prisma.market.findMany({
                include:{
                    idols: true
                },
                skip: (page-1)*10,
                take: 10,
                where: {
                    idols: { name: idol_name }
                }
            })
        } else {
            query = await prisma.market.findMany({
                include:{
                    idols: true
                },
                skip: (page-1)*10,
                take: 10
            })
        }
        return {status: true, result: query};
    } catch (err) { return {status: false, result: null}
    } finally { await prisma.$disconnect() }
}
async function getByMarketID (market_id: number) {
    try {
        const query = await prisma.market.findFirst({where: {id: market_id}})
        return {status: true, result: query};
    } catch (err) { return {status: false, result: null}
    } finally { await prisma.$disconnect() }
}
async function addToMarket (owner_id: number, idol_id: number, price: number) {
    try {
        const query = await prisma.market.create({
            data: {owner_id, idol_id, price}
          })
        return {status: true, result: query};
    } catch (err) { return {status: false, result: null}
    } finally { await prisma.$disconnect() }
}
async function removeMarket (id: number) {
    try {
        const query = await prisma.market.delete({where: {id}})
        return {status: true, result: null};
    } catch (err) { return {status: false, result: null}
    } finally { await prisma.$disconnect() }
}

export const marketRepository = {
    addToMarket,
    getAll,
    getByMarketID,
    removeMarket
}