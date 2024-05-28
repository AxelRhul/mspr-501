import {NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client';


export async function GET(request: Request,{ params }: { params: { id: string } }) {
    const prisma = new PrismaClient();
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