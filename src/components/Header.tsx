import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

const user = "billiam"

export default function Header() {
  return ( 
  <Navbar position="static" className="bg-yellow-500" maxWidth="full">
    <NavbarBrand className="justify-start"><Link href="/dashboard" className="font-bold text-3xl text-white">Finesse</Link></NavbarBrand>
    <NavbarContent justify="end">
      {user
        ?
          <NavbarItem>
          Logged in as: {user}
          </NavbarItem>
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
