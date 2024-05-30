import {NextResponse} from "next/server";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from "@/constants";

export async function GET(req: Request) {

    const plants = await prisma.plant.findMany({
        include: {
            images: true,
            user: true,
        },
    });
    
    return NextResponse.json(plants);
}

export async function POST(req: Request) {

    const formData = await req.formData()

    const files = formData.getAll('images') as File[];

    const user = await prisma.user.findUnique({
        where: {
            email: String(formData.get('user-email')),
        },
    });

    if (!user) {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }

    const images = [];

    const newPlant = await prisma.plant.create({
        data: {
            name: String(formData.get('plant-name')),
            user: {
                connect: {
                    id: user.id,
                },
            }
        },
    });

    for (const file of files) {

        if(file && file.type !== "application/octet-stream") {

            let filename = file.name;

            if(filename === undefined || filename === null || filename === "") {
                filename = "default.jpg";
            }

            filename = uuidv4() + path.extname(filename);

            const dirPath = path.join(process.cwd(), 'public', 'uploads', newPlant.id);

            fs.mkdir(dirPath, { recursive: true }, (error) => {});

            const filePath = path.join(process.cwd(), 'public', 'uploads',newPlant.id, filename);

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
                    url: `/uploads/${newPlant.id}/${filename}`,
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