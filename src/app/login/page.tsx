'use client'

import React from "react";
import Header from "@/components/Header"
import {Button, Input} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    const {email, password} = e.target.elements
    const body = {
      email: email.value,
      password: password.value,
    }
    fetch("/api/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("user", JSON.stringify(data))
      router.push("/dashboard")
    })
  }
  return (
    <div className="dark:bg-blue-900 flex flex-col min-h-screen">
      <Header />
      <main className="flex justify-center mt-10">
        <div className="w-1/2 bg-blue-800 p-10 rounded-lg">
          <h1 className="text-3xl mb-4 font-semibold">Welcome Back...</h1>
          <form onSubmit={handleSubmitLogin} id="loginForm">
            <Input name="email" type="email" id="email" label="Email" className="m-4" color="primary"/>
            <Input name="password" type="password" id="password" label="Password" className="m-4" color="primary"/>

          <Button type="submit" form="loginForm" className="ml-4 bg-amber-700">
            Login
          </Button>
          </form>
        </div>
      </main>
    </div>
  )
}