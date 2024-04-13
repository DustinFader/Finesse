import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";
import { CategoryScale } from 'chart.js';
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const allPayments = await prisma.payments.findMany()
  return NextResponse.json({ message: 'Hello!', allPayments }, { status: 200 })
}

export async function POST(request: Request) {
  const {amount, category, is_additive, payment_name} = await request.json();

  let amountInt = parseInt(amount);

  // if (body.get("is_additive")) {
  //   additive_bool = true;
  // } else {
  //   additive_bool = false;
  // }

  // const categoryName = body.get("category");

  let categoryObj = await prisma.categories.findFirst({
    where: {
      name: category,
    },
  });

  if (!categoryObj) {
    categoryObj = await prisma.categories.create({
      data: {
        name: category,
      },
    });
  }
  
  const newPayment = await prisma.payments.create({
    data: {
      user_id: 1,
      category_id: categoryObj.category_id,
      name: payment_name,
      amount: amountInt,
      is_additive: is_additive === "true" ? true : false,
    }
  })

  return NextResponse.json({message: "passing", newPayment, category: categoryObj});
}

export async function DELETE(request: Request) {}