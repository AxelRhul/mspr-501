import { prisma } from "@/src/constants";
import {NextResponse} from "next/server";

export async function GET(request: Request,{ params }: { params: { email: string } }) {
    const user = await prisma.user.findUnique({
        where: {
            email: params.email,
        },
    });
    return NextResponse.json(user);
}