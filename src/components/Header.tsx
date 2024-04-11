import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Header() {
  return ( 
  <Navbar position="static" className="bg-amber-600" maxWidth="full">
    <NavbarBrand className="justify-start"><Link href="/dashboard" className="font-bold text-3xl text-yellow-100">Finesse</Link></NavbarBrand>
    <NavbarContent justify="end">
      <NavbarItem>
        <Button as={Link} href="/login" className="bg-amber-700">
          Login
        </Button>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} href="/register" className="bg-amber-700">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
  )
}
