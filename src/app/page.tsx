'use client'

import { useState } from "react";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { Button, Link } from "@nextui-org/react";


export default function Home() {
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem("user")))

  if (user) {
    redirect("/dashboard")
  }

  return (
    <main className="dark:bg-blue-900 flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col justify-between items-center m-20 bg-blue-700 rounded-lg">
        <h1 className="text-6xl m-10 font-semibold">Welcome to Finesse</h1>
        <div>
        <Button as={Link} size="lg" href="/login" className="bg-amber-600 m-10 mb-8 text-lg">
          Login
        </Button>
        <Button as={Link} size="lg" href="/register" className="bg-amber-600 m-10 mb-8 text-lg">
          Sign Up
        </Button>
        </div>
      </div>
    </main>
  );
}
