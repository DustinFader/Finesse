import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const allCategories = await prisma.categories.findMany()
  return NextResponse.json({ message: 'Hello!', allCategories }, { status: 200 })
}
