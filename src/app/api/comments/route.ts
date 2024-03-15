import prisma from "@/prisma/prisma";
import {NextResponse} from "next/server";


export async function POST(req: Request) {
    const formData = await req.formData()


    const newComment = await prisma.comment.create({
        data: {
            name: String(formData.get("name")),
            content: String(formData.get("comment")),
            plantId: String(formData.get("plantId")),
            createdAt: new Date()
        }
    })

    return NextResponse.json({message: "Files processed"});
}