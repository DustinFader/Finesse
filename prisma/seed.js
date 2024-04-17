const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Insert users
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        email: 'test@test.com',
        password: 'password',
      },
      {
        id: 2,
        email: 'Testing-again@test.com',
        password: 'password1',
      },
    ],
  });

  // Insert categories
  await prisma.category.createMany({
    data: [
      { category_id: 1, name: 'Test-Category' },
      { category_id: 2, name: 'Non-essential Good' },
    ],
  });

  // Insert payments
  await prisma.payment.createMany({
    data: [
      {
        user_id: 1,
        category_id: 1,
        name: 'Test Payment',
        amount: 100,
        is_additive: false,
        payment_id: 1,
      },
      {
        user_id: 2,
        category_id: 2,
        name: 'Test Payment 2',
        amount: 15,
        is_additive: true,
        payment_id: 2,
      },
    ],
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });