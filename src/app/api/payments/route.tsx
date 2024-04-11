import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";
import { CategoryScale } from 'chart.js';
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const allPayments = await prisma.payments.findMany()
  return NextResponse.json({ message: 'Hello!', allPayments }, { status: 200 })
}

export async function POST(request: Request) {
  const body = await request.formData();
  let additive_bool = null;
  let amountInt = parseInt(body.get("amount"));

  if (body.get("is_additive")) {
    additive_bool = true;
  } else {
    additive_bool = false;
  }

  const newPayment = await prisma.payments.create({
    data: {
      user_id: 7,
      category_name: body.get("category"),
      name: body.get("payment_name"),
      amount: amountInt,
      is_additive: additive_bool,
    }
  })

  category.payment_id = newPayment.payment_id;

  return NextResponse.json({message: "passing", body: body});
}

export async function DELETE(request: Request) {}