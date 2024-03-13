import prisma from "@/prisma/prisma";
import {NextResponse} from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET(request: Request,{ params }: { params: { id: string } }) {
    const plant = await prisma.plant.findUnique({
        where: {
            id: params.id,
        },
        include: {
            images: true,
            comments: true
        },
    });
    return NextResponse.json(plant);
}