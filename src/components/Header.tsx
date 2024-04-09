import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";

export default function Header() {
  return ( 
  <Navbar>
    <NavbarBrand className="font-bold text-2xl">Finesse</NavbarBrand>
    <NavbarContent justify="end">
      <NavbarItem>
        <Link color="foreground" href="#">
          Login
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Sign Up
        </Link>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
  )
}
