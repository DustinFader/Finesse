import React, { useEffect } from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
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

export default function FinanceTable({ payments, categories, setCategories, setPayments }) {

  useEffect(() => {
    fetch("/api/payments")
      .then((res) => res.json())
      .then((data) => setPayments(data.allPayments));
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.allCategories));
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handleSubmitPayment(event) {
    event.preventDefault();
    //set payment/category?
    const {amount, category, is_additive, payment_name} = event.target.elements;

    const formData = {amount: amount.value, category: category.value, is_additive: is_additive.value, payment_name: payment_name.value}
    console.log(formData);

    fetch("/api/payments", {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setPayments(prev => [...prev, data.newPayment])
      setCategories(prev => {
        const categoryExists = prev.find((cat) => cat.id === data.newPayment.category_id)
        if (!categoryExists) {
          return [...prev, data.category]
        }
        return [...prev]
      })
      onOpenChange()
    })
  }

  const handleClickDeletePayment = (pId) => {
    console.log(`deleting, ${pId}`)
  }

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
    {
      key: "delete",
      label: "Delete",
    },
  ];

  const getKeyValue = (item, key) => {
    if (key === 'category_id') {
      const category = categories.find(cat => cat.category_id === item.category_id);
      return category ? category.name : ''; // Get the category name or empty string if not found
    }
    return item[key];
  };

  console.log(payments)

  return (
    <div>
      <Button onPress={onOpen} className="bg-amber-700 mb-4">
        Add Payment
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" className="bg-blue-800">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Payment
              </ModalHeader>
              <form onSubmit={handleSubmitPayment}>
              <ModalBody>
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
              </ModalBody>
              <ModalFooter>
                <Button
                    className="bg-amber-700"
                    type="submit"
                  >
                    Add
                  </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table aria-label="Example table with dynamic content" classNames={{wrapper: "bg-blue-800"
      }}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="bg-blue-700">{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={payments}>
          {(item) => (
            <TableRow key={item.payment_id}>
              {(columnKey) => {
                return columnKey !== "delete"
                ? <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                : <TableCell><Button onClick={() => handleClickDeletePayment(item.payment_id)} className="bg-amber-700">Delete</Button></TableCell>
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
