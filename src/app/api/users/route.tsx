import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: Request) { 
  const body = await request.formData();

  await prisma.users.create({
    data: {
      email: body.get("email"),
      password: body.get("password"),
    }
  })

  return NextResponse.redirect(new URL('/', request.url));
}

export async function DELETE(request: Request) {
  const body = await request.formData();
  const email = body.get("email");

  const user = await prisma.users.deleteMany({
    where: {
      email: email,
    }
  })

  const showUsers = await prisma.users.findMany({
    where: {
      email: email,
    },
  })

  return NextResponse.redirect(new URL('/', request.url))
}