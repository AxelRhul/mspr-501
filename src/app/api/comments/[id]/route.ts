import {NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function GET(request: Request,{ params }: { params: { id: string } }) {
    const comments = await prisma.comment.findMany({
        where: {
            plantId: params.id,
        },
        include: {
            plant: true,
            user: true,
        },
    });
    return NextResponse.json(comments);
}