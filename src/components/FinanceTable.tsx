import React from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Link
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
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
<Table aria-label="Example table with dynamic content" className="bg-red-300">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} className="text-center" onClick={(onOpen)}>
              <Button onPress={onOpen} className="bg-amber-700">Add Payment</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        className="bg-blue-800"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New Payment</ModalHeader>
              <ModalBody>
                <form action="/api/payments" method="POST" id="addPayment">
                  <Input
                    autoFocus
                    label="Category"
                    name="category"
                    placeholder="Payment Category"
                    color="primary"
                  />
                  <Input
                    label="Name"
                    name="payment_name"
                    placeholder="Payment Name"
                    color="primary"
                  />
                  <Input
                    label="Amount"
                    name="amount"
                    placeholder="Payment Name"
                    color="primary"
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                    value="true"
                    name="is_additive"
                    >
                      Additive
                    </Checkbox>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} type="submit" form="addPayment" className="bg-amber-700">
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
            </TableCell>
            <TableCell className="hidden">a</TableCell>
            <TableCell className="hidden">a</TableCell>
          </TableRow>
        </TableBody>
      </Table>
  );
}
