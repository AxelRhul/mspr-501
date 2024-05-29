import {NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client';

export async function GET(request: Request,{ params }: { params: { email: string } }) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
        where: {
            email: params.email,
        },
    });
    return NextResponse.json(user);
}