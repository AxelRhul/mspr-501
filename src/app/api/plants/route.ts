import {NextResponse} from "next/server";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from "@/constants";
import * as fse from 'fs-extra';
const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'dy1bfclg5',
  api_key: '769527748627414',
  api_secret: 'pJZKb5rfDByGJolFSQDNUcwIRe8',
  secure: true,
});

async function copyDirectory(source: string, destination: string): Promise<void> {
    try {
        await fse.copy(source, destination);
        console.log('Directory copied successfully');
    } catch (error) {
        console.error('Error copying directory:', error);
    }
}

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

            fs.mkdir(dirPath, { recursive: true }, (error) => {
                if (error) {
                    console.error('Directory creation error:', error);
                } else {
                    console.log('Directory created successfully');
                    // Set directory permissions to drwxr-xr-x
                    fs.chmod(dirPath, 0o777, (err) => {
                        if (err) {
                            console.error('Error setting directory permissions:', err);
                        } else {
                            console.log('Directory permissions set to drwxr-xr-x');
                        }
                    });
                }
            });

            const filePath = path.join(process.cwd(), 'public', 'uploads',newPlant.id, filename);

            const arrayBuffer = await file.arrayBuffer();

            const fileBuffer = Buffer.from(arrayBuffer);

            fs.writeFile(filePath, fileBuffer, (err) => {
                if (err) {
                    console.error('File writing error:', err);
                } else {
                    console.log('File written successfully');
                    fs.chmod(filePath, 0o777, (chmodErr) => {
                        if (chmodErr) {
                            console.error('Error setting file permissions:', chmodErr);
                        } else {
                            console.log('File permissions set to -rw-r--r--');
                        }
                    });
                }
            })

            const result = await cloudinary.uploader.upload(filePath, {
                public_id: filename,
            });

            const image = await prisma.image.create({
                data: {
                    url: result.url,
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
    const sourceDirPath = path.join(process.cwd(), 'public', 'uploads', newPlant.id);
    const targetDirPath = path.join(process.cwd(), 'standalone', 'public');

    return NextResponse.json({message: "Files processed"});
}