import React from "react";
import Header from "@/components/Header"
import {Button, Input} from "@nextui-org/react";

export default function Login() {
  return (
    <div className="dark:bg-blue-900 flex flex-col min-h-screen">
      <Header />
      <main className="flex justify-center mt-10">
        <div className="w-1/2 bg-blue-800 p-10 rounded-lg">
          <h1 className="text-3xl mb-4 font-semibold">Welcome Back...</h1>
          <form action="/api/users" method="POST" id="addUser">
            <Input name="email" type="email" id="email" label="Email" className="m-4" color="primary"/>
            <Input name="password" type="password" id="password" label="Password" className="m-4" color="primary"/>
          </form>

          <Button type="submit" form="addUser" value="Submit" className="ml-4 bg-amber-700">
            Login
          </Button>
        </div>
      </main>
    </div>
  )
}