import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const allUsers = await prisma.users.findMany()
  return NextResponse.json({ message: 'Hello!', allUsers }, { status: 200 })
}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}