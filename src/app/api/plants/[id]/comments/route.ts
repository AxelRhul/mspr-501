import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/src/constants";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {

  const formData = await req.formData();

  const userId = formData.get("user-id");
  const content = formData.get("comment");

  if (!userId || !content) {
    return NextResponse.json("Incomplet", { status: 406 })
  }

  const comment = await prisma.comment.create({
    data: {
      userId: userId as string,
      content: content as string,
      plantId: params.id
    }
  })

  return NextResponse.json(comment, { status: 201 })
}