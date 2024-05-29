import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {

    const prisma = new PrismaClient();

    const formData = await req.formData();

    const files = formData.getAll('images');

    const plant = await prisma.plant.findUnique({
        where: {
            id: String(params.id)
        },
        include: {
            images: true,
        }
    })

    const images = plant?.images;

    for (const file of files) {
        if (file instanceof File && file.type !== "application/octet-stream" && images) {
            let filename = file.name;
            if (filename === undefined || filename === null || filename === "") {
                filename = "default.jpg";
            }
            filename = uuidv4() + path.extname(filename);
            const dirPath = path.join(process.cwd(), 'public', 'uploads', plant.id);

            fs.mkdir(dirPath, { recursive: true }, (error) => { });

            const filePath = path.join(process.cwd(), 'public', 'uploads', plant.id, filename);
            const arrayBuffer = await file.arrayBuffer();
            const fileBuffer = Buffer.from(arrayBuffer);

            fs.writeFile(filePath, fileBuffer, (err) => {
                if (err) {
                    console.error('File writing error:', err);
                } else {
                    console.log('File written successfully');

                }
            })

            const image = await prisma.image.create({
                data: {
                    url: `/uploads/${plant.id}/${filename}`,
                    plant: {
                        connect: {
                            id: plant.id,
                        },
                    },
                },
            });
            images.push(image);
        }
    }
    if (images) {
        await prisma.plant.update({
            where: { id: params.id },
            data: {
                images: {
                    connect: images.map((image) => ({ id: image.id })),
                },
            },
        });
    }

    return NextResponse.json("file uploaded successfully")
}