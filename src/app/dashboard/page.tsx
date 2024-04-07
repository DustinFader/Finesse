'use client'

import React from "react";
import Header from "@/components/Header"
import FinanceTable from "@/components/FinanceTable"
import Footer from "@/components/Footer"

export default function Dashboard() {
  return (
    <div className="dark:bg-teal-800 flex flex-col min-h-screen">
      <Header/>
      <main className="flex justify-evenly flex-grow">
        <div>
          <div className="flex justify-evenly">
            <div>Bar</div>
            <div>
              <p><b>Income:</b> {"200"}</p>
              <p><b>Expences:</b> {"-950"}</p>
            </div>
          </div>
          <FinanceTable/>
        </div>
        <div>
          <p>Chart</p>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
