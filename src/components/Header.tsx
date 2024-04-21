'use client'

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";


export default function Header( {user}) {
  const router = useRouter()

  const handleClickLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  return ( 
  <Navbar position="static" className="bg-yellow-500" maxWidth="full">
    <NavbarBrand className="justify-start"><Link href="/" className="font-bold text-3xl text-white">Finesse</Link></NavbarBrand>
    <NavbarContent justify="end">
      {user
        ?
        <>
          <NavbarItem>
            Logged in as: {user.email}
          </NavbarItem>
          <NavbarItem>
            <Button onClick={handleClickLogout} className="bg-amber-600">
              Logout
            </Button>
          </NavbarItem>
        </>
        :
        <>
          <NavbarItem>
            <Button as={Link} href="/login" className="bg-amber-600">
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href="/register" className="bg-amber-600">
              Sign Up
            </Button>
          </NavbarItem>
        </>}
    </NavbarContent>
  </Navbar>
  )
}
