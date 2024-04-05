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
  NavbarMenuItem
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
    <div>
      <Navbar>Finesse</Navbar>
      <div>
        <div>
          <div>
            <div>Bar</div>
            <div>
              <b>income</b>
              <br />
              <b>Expences</b>
            </div>
          </div>
          <Table aria-label="Example table with dynamic content">
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
      </div>
    </div>
  );
}
