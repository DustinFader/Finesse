import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) { 
  const body = await request.json();
  const { email, password } = body

  const loggedInUser = await prisma.users.create({
    data: {
      email,
      password,
    }
  })

  const responseBody = {
    ...loggedInUser,
    password: null,
  }


  return NextResponse.json(responseBody)
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