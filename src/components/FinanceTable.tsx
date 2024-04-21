import React, {useState} from "react";

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
} from "@nextui-org/react";

export default function FinanceTable({payments, setPayments, categories, setCategories}) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ checkboxValue, setCheckboxValue ] = useState(false);

  function handleSubmitPayment(event) {
    event.preventDefault();
    //set payment/category?
    const {amount, category, is_additive, payment_name} = event.target.elements;

    const formData = {amount: amount.value, category: category.value, is_additive: is_additive.value, payment_name: payment_name.value}

    fetch("/api/payments", {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then((data) => {
      setPayments(prev => [...prev, data.newPayment])
      setCategories(prev => {
        const categoryExists = prev.find((cat) => cat.category_id === data.newPayment.category_id)
        if (!categoryExists) {
          return [...prev, data.category]
        }
        return [...prev]
      })
      onOpenChange()
    })
  }

  const handleClickDeletePayment = (pId) => {
    const data = {id: pId, message: "present!"}
      fetch("/api/payments", {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "DELETE",
      body: JSON.stringify(data),
    })
    .then(() => {
      fetch("/api/payments")
      .then((res) => res.json())
      .then((data) => {
      setPayments(data.allPayments)
      });
    })
    .catch((error) => console.log(error))
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

  // the key is for the value in payment and runs the code for it else returns the payment value alone
  const getKeyValue = (payment, key) => {
    if (key === 'category_id') {
      const category = categories.find(cat => cat.category_id === payment.category_id);
      return category ? category.name : ''; // Get the category name or empty string if not found
    }

    if (key === 'amount') {
      return payment.is_additive ? payment.amount : -payment.amount;
    }
    return payment[key];
  };

  return (
    <div>
      <Button onPress={onOpen} className="bg-amber-600 mb-4">
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
                    name="is_additive"
                    value={checkboxValue}
                    isSelected={checkboxValue}
                    onValueChange={setCheckboxValue}
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
          {(payment) => (
            <TableRow key={payment.payment_id}>
              {(columnKey) => {
                return columnKey !== "delete"
                ? <TableCell className={payment.is_additive ? "" : "bg-red-700"}>{getKeyValue(payment, columnKey)}</TableCell>
                : <TableCell className={payment.is_additive ? "" : "bg-red-700"}><Button onClick={() => handleClickDeletePayment(payment.payment_id)} className="bg-amber-600">Delete</Button></TableCell>
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
