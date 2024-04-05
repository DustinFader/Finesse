'use client'

import React from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,

  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

export default function Dashboard() {
  const rows = [
    {
      key: "1",
      category: "rent",
      payment: "rent",
      amount: -950,
    },
  ];

  const columns = [
    {
      key: "category",
      label: "Category",
    },
    {
      key: "payment",
      label: "Payment",
    },
    {
      key: "amount",
      label: "Amount",
    },
  ];

  return (
    <>
      <Navbar space-between>
        <NavbarBrand className="font-bold" >Finesse</NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>Login</NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className="flex justify-evenly">
        <div>
          <div className="flex justify-evenly">
            <div>Bar</div>
            <div>
              <b>Income {"200"}</b>
              <br />
              <b>Expences {"-950"}</b>
            </div>
          </div>
          <Table>
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <p>Chart</p>
        </div>
      </main>
      <footer className="flex justify-center">footer</footer>
    </>
  );
}
