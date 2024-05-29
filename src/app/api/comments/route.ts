import {NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client';
import { error } from "console";

export async function POST(req: Request) {
    const prisma = new PrismaClient();
    const formData = await req.formData()

    const plant = await prisma.plant.findUnique({
        where: {
            id: String(formData.get('plant-id')),
        },
    });
    
    const newComment = await prisma.comment.create({
        data: {
            content: String(formData.get("content")),
            createdAt: new Date(),
            plant: {
                connect: {
                    id: plant.id
                }
            },
            user : {
                connect: {
                    id: String(formData.get('user-id'))
                }
            }
        }
    })
    return NextResponse.json({message: "Files processed"});
}