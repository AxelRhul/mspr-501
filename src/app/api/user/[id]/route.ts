import { NextResponse } from "next/server";
import { prisma } from "@/constants";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: params.id,
            },
            include: {
                plants: {
                    include: {
                        images: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}
