import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) { 
  const body = await request.formData();
  const email = body.get("email");
  const password = body.get("password");
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    }
  })

  // if POST from login page
  if (body.get('formType') === 'login') {
    const userLogin = await prisma.users.findFirst({
      where: {
        email: email,
        password: password
    }
  })

    if (!user) {
      // todo: user does not exist
    }

    if (!userLogin) {
      // todo: user does not have the right password
    }

    if (user) {
      // todo: login user by creating cookie.
    }
    return NextResponse.redirect(new URL('/login', request.url), { headers: { 'next-action': 'refresh' }});
  }

  // if POST from register page
  if (body.get('formType') === 'register') {

    if (user) {
      // user already exists
      return NextResponse.redirect(new URL('/login', request.url), { headers: { 'next-action': 'refresh' }});
    }

    await prisma.users.create({
      data: {
        email: email,
        password: password,
      }
    })

    // todo: create cookie

    return NextResponse.redirect(new URL('/dashboard', request.url), { headers: { 'next-action': 'refresh' }});
  }
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