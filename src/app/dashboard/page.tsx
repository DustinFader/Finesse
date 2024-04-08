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
const expence = -950;
const barSampleData = {
  labels: ['Money'],
  datasets: [
    {
      label: "Income",
      data: [
        {x: [0, income], y: 'Money'}
      ],
      backgroundColor: [
        'rgba(0, 99, 132, 0.7)',
      ],
      borderWidth: 1,
    },
    {
      label: "Expences",
      data: [expence],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function Dashboard() {

  return (
    <div className="dark:bg-teal-800 flex flex-col min-h-screen">
      <Header/>
      <main className="flex justify-evenly flex-grow">
        <div>
          <div className="flex justify-evenly">
            <div>
              <Bar data={barSampleData}/>
            </div>
            <div>
              <p><b>Income:</b> {income}</p>
              <p><b>Expences:</b> {expence}</p>
            </div>
            </div>
          <FinanceTable/>
        </div>
        <div>
          <PieChart data={chartSampleData}/>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
