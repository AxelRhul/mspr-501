import { PrismaClient } from '@prisma/client';

export const BASE_URL = "http://localhost:3000"

export const prisma = new PrismaClient();