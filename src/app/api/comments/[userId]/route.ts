import prisma from "@/prisma/prisma";
import {NextResponse} from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET(request: Request,{ params }: { params: { userId: string } }) {
    const plant = await prisma.comment.findMany({
        where: {
            userId: params.userId,
        },
        include: {
            plant: true,
            user: true,
        },
    });
    return NextResponse.json(plant);
}