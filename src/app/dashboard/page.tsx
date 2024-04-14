'use client'

import React, { useState, useEffect } from "react";
import Header from "@/components/Header"
import FinanceTable from "@/components/FinanceTable"
import Footer from "@/components/Footer"
import PieChart from "@/components/PieChart"
import Bar from "@/components/Bar"


const chartSampleData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {  
      data: [12, 19, 3], // Example data
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
      ],
      borderWidth: 1,
      
    },
  ],
};

export default function Dashboard() {
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

  const income = payments.reduce((accumulator, payment) => {
    if(payment.is_additive === true) {
      return accumulator += payment.amount;
    } else {
      return accumulator;
    }
  }, 0);

  const expense = payments.reduce((accumulator, payment) => {
    if (payment.is_additive === false) {
      return accumulator += payment.amount;
    } else {
      return accumulator;
    }
  }, 0)

  console.log(expense)

  return (
    <div className="dark:bg-blue-900 flex flex-col min-h-screen">
      <Header/>
      <main className="flex justify-between flex-grow">
        <div className="flex flex-col w-3/4">
          <div className="flex m-10 justify-between items-center bg-blue-800 rounded-lg">
            <div className="w-1/2">
              <Bar income={income} expense={expense} categories={categories}/>
            </div>
            <div className="text-xl m-10">
              <p><b>Income:</b> {income}</p>
              <p><b>Expenses:</b> {expense}</p>
            </div>
            </div>
            <div className="m-10">
              <FinanceTable categories={categories} setCategories={setCategories} payments={payments} setPayments={setPayments} />
            </div>
        </div>
        <div className="w-1/4 bg-blue-800 flex flex-col items-center">
          <h2 className="mt-4 text-xl font-semibold">Expense Categories</h2>
          <div className="m-10">
            <PieChart data={chartSampleData}/>
          </div>
        </div>
      </main>
    </div>
  );
}
