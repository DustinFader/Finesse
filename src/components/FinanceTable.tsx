import React from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue
} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    category: "rent",
    payment: "rent",
    amount: -950,
  },
  {
    key: "2",
    category: "rent",
    payment: "rent",
    amount: -950,
  },
  {
    key: "3",
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

export default function FinanceTable() {
  // Quick copy from the 
  return (
    <Table aria-label="Table of payments">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
