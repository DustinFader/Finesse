import React, { useState, useEffect } from "react";
import { PrismaClient } from '@prisma/client'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
  // getKeyValue,
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

export default function FinanceTable() {
  const [payments, setPayments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/payments")
      .then((res) => res.json())
      .then((data) => setPayments(data.allPayments));
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.allCategories));
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

  const getKeyValue = (item, key) => {
    if (key === 'category_id') {
      const category = categories.find(cat => cat.category_id === item.category_id);
      return category ? category.name : ''; // Get the category name or empty string if not found
    }
    return item[key];
  };

  // function handleSubmit(event, onClose) {
  //   event.preventDefault();
  //   const form = event.target;
  //   const formData = new FormData(form);
    
  //   fetch('/api/payments', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //   .then((res) => res.json())
  //   .then((data) => setPayments(data.allPayments))
  //   .then(response => {
  //     console.log('Form submitted successfully');
  //     onClose(); // Close the modal after successful submission
  //   })
  //   .catch(error => {
  //     console.error('Error submitting form:', error);
  //   });
  // }

  return (
    <div>
      <Button onPress={onOpen} color="primary">
        Add Payment
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Payment
              </ModalHeader>
              <ModalBody>
                <form id="addPayment" method="POST" action={'/api/payments'}>
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
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={payments}>
          {(item) => (
            <TableRow key={item.payment_id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
