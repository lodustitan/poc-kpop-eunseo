import prisma from "../database/database";

async function createSession(token: string, userId: number) {
  return prisma.sessions.create({
    data: { token, userId },
  });
}

async function getSessionByUserId(userId: number) {
  return prisma.sessions.findFirst({
    where: { userId }
  })
}

async function deleteSessionByUserId(userId: number) {
  return prisma.sessions.deleteMany({
    where: { userId }
  })
}

export const sessionsRepository = {
  createSession,
  getSessionByUserId,
  deleteSessionByUserId
}