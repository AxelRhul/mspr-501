import {NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export async function GET(request: Request,{ params }: { params: { id: string } }) {
    const plant = await prisma.plant.findUnique({
        where: {
            id: params.id,
        },
        include: {
            images: true,
            comments: true,
            user: true,
        },
    });
    return NextResponse.json(plant);
}