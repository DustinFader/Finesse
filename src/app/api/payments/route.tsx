import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const allPayments = await prisma.payments.findMany()
  return NextResponse.json({ message: 'Hello!', allPayments }, { status: 200 })
}

export async function POST(request: Request) {
  const body = await request.formData();
  let additive_bool = null;
  let amountInt = parseInt(body.get("amount"));
  console.log(body)

  if (body.get("is_additive")) {
    additive_bool = true;
    console.log(additive_bool)
  } else {
    additive_bool = false;
    console.log(additive_bool)
  }

  await prisma.payments.create({
    data: {
      user_id: 7,
      category_id: 1,
      name: body.get("payment_name"),
      amount: amountInt,
      is_additive: additive_bool,
    }
  })

  const showPayment = await prisma.payments.findMany({
    where: {
      name: body.get("payment_name"),
    },
  })

  console.log(showPayment)

  return NextResponse.json({message: "passing", body: body});
}

export async function DELETE(request: Request) {}