import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function getCommentsByUserId(userId: number) {
    return prisma.comment.findMany({
        where: {
            userId: userId,
        },
    });
}