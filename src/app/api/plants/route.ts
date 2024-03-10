import {NextResponse} from "next/server";
import fs from 'fs';
import path from 'path';

import prisma from '@/prisma/prisma';

export async function GET(req: Request) {
    const plants = await prisma.plant.findMany({
        include: {
            images: true,
        },
    });
    return NextResponse.json(plants);
}

export async function POST(req: Request) {
    const formData = await req.formData()
    const files = formData.getAll('images');
    console.log(files)

    const images = [];

    const newPlant = await prisma.plant.create({
        data: {
            name: formData.get('plant-name'),
            userName: formData.get('name'),
        },
    });

    for (const file of files) {
        if(file.type !== "application/octet-stream") {
            let filename = file.name;
            if(filename === undefined || filename === null || filename === "") {
                filename = "default.jpg";
            }
            const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
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
                    url: `/uploads/${filename}`,
                    plant: {
                        connect: {
                            id: newPlant.id,
                        },
                    },
                },
            });
            images.push(image);
        }
        }

    await prisma.plant.update({
        where: { id: newPlant.id },
        data: {
            images: {
                connect: images.map((image) => ({ id: image.id })),
            },
        },});


    return NextResponse.json({message: "Files processed"});
}
