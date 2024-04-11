"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
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
  Link,
} from "@nextui-org/react";

export default function Test() {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/payments")
      .then((res) => res.json())
      .then((data) => setPayments(data.allPayments));
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

      <form action="/api/users" method="POST" id="addUser">
        <Input name="email" type="email" id="email" label="Email" />
        <Input name="password" type="password" id="password" label="Password" />
      </form>

      <Button type="submit" form="addUser" value="Submit">
        Submit
      </Button>

      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} className="text-center" onClick={onOpen}>
              <Button onPress={onOpen} color="primary">
                Add Payment
              </Button>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        New Payment
                      </ModalHeader>
                      <ModalBody>
                        <form
                          action="/api/payments"
                          method="POST"
                          id="addPayment"
                        >
                          <Input
                            autoFocus
                            label="Category"
                            name="category"
                            placeholder="Payment Category"
                            variant="bordered"
                          />
                          <Input
                            label="Name"
                            name="payment_name"
                            placeholder="Payment Name"
                            variant="bordered"
                          />
                          <Input
                            label="Amount"
                            name="amount"
                            placeholder="Payment Name"
                            variant="bordered"
                          />
                          <div className="flex py-2 px-1 justify-between">
                            <Checkbox value="true" name="is_additive">
                              Additive
                            </Checkbox>
                          </div>
                        </form>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onPress={onClose}
                          type="submit"
                          form="addPayment"
                        >
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

      <h2>Data below, work into table pls</h2>
      {/* {payments.map((data) => {
        return(
          <li className="list-item" key={data.payment_id}> {data.category_id}, {data.name}, {data.amount} </li>
        )
      })} */}
    </div>
  );
}
