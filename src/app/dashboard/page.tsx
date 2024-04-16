'use client'

import React, { useState, useEffect } from "react";
import Header from "@/components/Header"
import FinanceTable from "@/components/FinanceTable"
import PieChart from "@/components/PieChart"
import Bar from "@/components/Bar"

interface categoriesTotalInterface {
  categoryTotal: Number;
  name: String;
  color: any;
}

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

  function categoriesTotal(): categoriesTotalInterface[] {
    const catTotal = [];
    // the complexity bothers me but i did it. This gives back [{categoryTotal: number, name: 'name of category'}...]
    for(let c = 0; c < categories.length; c++) {
      const categoryTotal = payments.reduce((total, current) => total + (current.category_id === categories[c].category_id && !current.is_additive ? current.amount : 0), 0);
      // doesnt count the ones that have zero payments to them.
      if (!categoryTotal) continue;
      catTotal.push({categoryTotal, name: categories[c].name, color: `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`})
    }
    console.log(catTotal)
    return catTotal;
  }

  const catTotals = categoriesTotal()

  const chartData = {
    labels: [...catTotals.map(cat => cat.name)],
    datasets: [
      {  
        data: [...catTotals.map(cat => cat.categoryTotal)],
        backgroundColor: [
          // randomized rgba based on the amount of categories
          ...catTotals.map(cat => {
          console.log(cat.color);
          return cat.color;
        })
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const total = (additive: boolean) => {
    return payments.reduce((total, current) =>
      total + (current?.is_additive === additive ? current.amount : 0), 0
    )
  }
  
  const barData = {
    labels: ['Money'],
    datasets: [
      {
        barThickness: 80,
        label: "Income",
        data: [
          {x: [0, total(true)], y: 'Money'}
        ],
        backgroundColor: [
          '#55C572',
        ],
        borderWidth: 1,
      },
      {
        barThickness: 80,
        label: "Expenses",
        data: [{
          x: [-total(false), 0], y: 'Money'
        }],
        backgroundColor: [
          '#C70039',
        ],
        borderWidth: 1,
      },
    ],
  };

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
              <p><b>Income:</b> {total(true)}</p>
              <p><b>Expenses:</b> {total(false)}</p>
            </div>
            </div>
            <div className="m-10">
              <FinanceTable categories={categories} setCategories={setCategories} payments={payments} setPayments={setPayments} />
            </div>
        </div>
        <div className="w-1/4 bg-blue-800 flex flex-col items-center">
          <h2 className="mt-4 text-xl font-semibold">Expense Categories</h2>
          <div className="m-10">
            <PieChart data={chartData}/>
            <div className="legend">
              <ul className="flex flex-col items-center mt-10 text-xl gap-4">
                {...catTotals.map(cat => <li key={cat.name} className='flex flex-row gap-4' ><div style={{ backgroundColor: cat.color }} className={`box`}/>{cat.name}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
