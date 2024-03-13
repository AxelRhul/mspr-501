import prisma from "@/prisma/prisma";
import {NextResponse} from "next/server";


export async function POST(req: Request) {
    const formData = await req.formData()


    const newComment = await prisma.comment.create({
        data: {
            name: formData.get("name"),
            content: formData.get("comment"),
            plantId: formData.get("plantId"),
            createdAt: new Date()
        }
    })

    return NextResponse.json({message: "Files processed"});
}