"use client"

import React, {useState, useEffect} from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableColumn, getKeyValue } from "@nextui-org/react";

export default function Test() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch('/api/payments')
      .then(res => res.json())
      .then(data => setPayments(data.allPayments))
  }, [])

  const columns = [
    {
      key: "category_id",
      label: "Category",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "amount",
      label: "Amount",
    },
  ];

  return (
    <div>
      <p>testing testing</p>

      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={payments}>
          {(item) => (
            <TableRow key={item.payment_id}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};