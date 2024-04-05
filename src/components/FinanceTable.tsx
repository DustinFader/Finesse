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
  return (
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
  );
}
