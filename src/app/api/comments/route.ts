import { NextResponse } from 'next/server';

import { prisma } from '@/src/constants';

export async function GET(req: Request) {
	const comments = await prisma.comment.findMany({
		select: {
			id: true,
			content: true,
			createdAt: true,
			user: {
				select: {
					name: true,
				},
			},
			plant: {
				select: {
					name: true,
				},
			},
		},
	});

	// add a delay
	await new Promise((resolve) => setTimeout(resolve, 3000));

	return NextResponse.json(comments, { status: 200 });
}

export async function POST(req: Request) {
	const formData = await req.formData();

	const plant = await prisma.plant.findUnique({
		where: {
			id: String(formData.get('plant-id')),
		},
	});

	if (!plant) {
		return NextResponse.error();
	}

	const newComment = await prisma.comment.create({
		data: {
			content: String(formData.get('content')),
			createdAt: new Date(),
			plant: {
				connect: {
					id: plant.id,
				},
			},
			user: {
				connect: {
					id: String(formData.get('user-id')),
				},
			},
		},
	});
	return NextResponse.json({ message: 'Files processed' });
}
