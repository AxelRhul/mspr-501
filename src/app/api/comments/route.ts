import {NextResponse} from "next/server";

import { prisma } from "@/constants";

export async function POST(req: Request) {
    const formData = await req.formData()

    const plant = await prisma.plant.findUnique({
        where: {
            id: String(formData.get('plant-id')),
        },
    });

    if(!plant) {
        return NextResponse.error();
    }
    
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