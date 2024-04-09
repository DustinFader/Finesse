import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: Request) { 
  const body = await request.formData();
  console.log(body)

  await prisma.users.create({
    data: {
      user_id: 1,
      category_id: category,
      name: name,
      amount: amount,
      is_additive: additive
    }
  })

  return NextResponse.redirect(new URL('/', request.url));
}

export async function DELETE(request: Request) {
  const body = await request.formData();
  const email = body.get("email");

  console.log("being called")

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

  console.log(showUsers)
  return NextResponse.redirect(new URL('/', request.url))
}