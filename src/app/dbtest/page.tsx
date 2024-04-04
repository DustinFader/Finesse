import React from "react";
import { PrismaClient } from "@prisma/client";
import { Button } from "@nextui-org/react";

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.users.findMany()
  console.log (allUsers)
}

export default async function Test() {
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })

  return (
    <div>
      testing testing
      <Button>
        Button
      </Button>
      <p>testing testing</p>
    </div>
  );
};