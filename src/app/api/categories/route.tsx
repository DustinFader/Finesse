import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const allCategories = await prisma.categories.findMany()
  return NextResponse.json({ message: 'Hello!', allCategories }, { status: 200 })
}
