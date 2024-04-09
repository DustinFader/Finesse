"use client"

import React, {useState, useEffect} from "react";
import { Button } from "@nextui-org/react";

// 

// async function main() {
//   
//   console.log (allUsers)
// }

export default function Test() {
  const [users, setUsers] = useState([]);
  // main()
  //   .then(async () => {
  //     await prisma.$disconnect()
  //   })
  //   .catch(async (e) => {
  //     console.error(e)
  //     await prisma.$disconnect()
  //     process.exit(1)
  //   })
  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setUsers(data.allUsers))
  }, [])

  return (
    <div>
      <p>testing testing</p>
      <Button className="m-5">
        Button
      </Button>
      {users[0] && users[0].email}
    </div>
  );
};