import prisma from "@/prisma/prisma";
import {NextResponse} from "next/server";


export async function POST(req: Request) {
    const formData = await req.formData()

    const user = await prisma.user.findUnique({
        where: {
            email: formData.get('user-email'),
        },
    });

    const plant = await prisma.plant.findUnique({
        where: {
            id: formData.get('plantId'),
        },
    });

    const newComment = await prisma.comment.create({
        data: {
            content: formData.get("comment"),
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