'use client'

import React from "react";
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

const income = 200;
const expense = -950;
const barSampleData = {
  labels: ['Money'],
  datasets: [
    {
      barThickness: 80,
      label: "Income",
      data: [
        {x: [0, income], y: 'Money'}
      ],
      backgroundColor: [
        '#55C572',
      ],
      borderWidth: 1,
    },
    {
      barThickness: 80,
      label: "Expenses",
      data: [expense],
      backgroundColor: [
        '#C70039',
      ],
      borderWidth: 1,
    },
  ],
};

export default function Dashboard() {

  return (
    <div className="dark:bg-blue-900 flex flex-col min-h-screen">
      <Header/>
      <main className="flex justify-between flex-grow">
        <div className="flex flex-col w-3/4">
          <div className="flex m-10 justify-between items-center bg-blue-800 rounded-lg">
            <div className="w-1/2">
              <Bar data={barSampleData}/>
            </div>
            <div className="text-xl m-10">
              <p><b>Income:</b> {income}</p>
              <p><b>Expenses:</b> {expense}</p>
            </div>
            </div>
            <div className="m-10">
              <FinanceTable />
            </div>
        </div>
        <div className="w-1/4 bg-blue-800 flex flex-col items-center">
          <div className="m-10">
          <PieChart data={chartSampleData}/>
          </div>
          <ul className="flex flex-col items-center mt-10 text-xl">
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
          </ul>
        </div>
      </main>
      {/* <Footer/> */}
    </div>
  );
}
