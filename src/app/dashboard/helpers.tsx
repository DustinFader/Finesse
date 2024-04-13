import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PositiveTotal() {
  const allPositiveAmounts = await prisma.payments.findMany({
    where: {
      user_id: 1,
      is_additive: true,
    },
    select: {
      amount: true,
    }
  })
  const amounts = allPositiveAmounts.map(payment => payment.amount);
  const totalAmount = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return totalAmount;
}

export async function NegativeTotal() {
  const allNegativeAmounts = await prisma.payments.findMany({
    where: {
      user_id: 1,
      is_additive: false,
    },
    select: {
      amount: true,
    }
  })
  const amounts = allNegativeAmounts.map(payment => payment.amount);
  const totalAmount = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return totalAmount;

}