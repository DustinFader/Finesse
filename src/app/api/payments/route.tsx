import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const allPayments = await prisma.payments.findMany()
  return NextResponse.json({ allPayments }, { status: 200 })
}

export async function POST(request: Request) {
  const {amount, category, is_additive, payment_name} = await request.json();
  let amountInt = parseInt(amount);

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

  return NextResponse.json({ newPayment, category: categoryObj}, { status: 200 });
}

export async function DELETE(request: Request) {
  const data = await request.json();
  const removedPayment = await prisma.payments.delete({
    where: {
      payment_id: data.id
    }
  })

  return NextResponse.json({ removedPayment}, { status: 200 })
}