import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {

  const formData = await req.formData();

  const name = formData.get("name");
  const content = formData.get("comment");

  if (!name || !content) {
    return NextResponse.json("Incomplet", { status: 406 })
  }

  const comment = await prisma.comment.create({
    data: {
      name: name as string,
      content: content as string,
      plantId: params.id
    }
  })

  return NextResponse.json(comment, { status: 201 })

}