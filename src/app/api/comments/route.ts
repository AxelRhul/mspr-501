import {NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client';

export async function POST(req: Request) {
    const prisma = new PrismaClient();
    const formData = await req.formData()

    const user = await prisma.user.findUnique({
        where: {
            email: formData.get('user-email'),
        },
    });

    const plant = await prisma.plant.findUnique({
        where: {
            id: formData.get('plant-id'),
        },
    });

    const newComment = await prisma.comment.create({
        data: {
            content: formData.get("content"),
            createdAt: new Date(),
            plant: {
                connect: {
                    id: plant.id
                }
            },
            user : {
                connect: {
                    id: user.id
                }
            }
        }
    })
    return NextResponse.json({message: "Files processed"});
}