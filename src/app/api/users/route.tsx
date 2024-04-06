import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// export async function GET(request: Request) {
//   const allUsers = await prisma.users.findMany()
//   return NextResponse.json({ message: 'Hello!', allUsers }, { status: 200 })
// }

export async function POST(request: Request) { 
  const body = await request.formData();
  console.log(body)

  const email = body.get("email");
  const pass = body.get("password");

  await prisma.users.create({
    data: {
      email: email,
      password: pass,
    }
  })

  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  })

  console.log(user)
  return NextResponse.redirect(new URL('/', request.url));
}
