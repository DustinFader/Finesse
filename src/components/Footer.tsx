import React from "react"
import { Link } from "@nextui-org/react"

export default function Footer() {
  return (
    <footer className="flex justify-center items-center h-10 text-xs bg-gray-700">Created by:<Link href="https://github.com/DustinFader" className="text-xs mx-1 text-white underline">DustinFader</Link>, <Link href="https://github.com/Kateaclysm" className="text-xs mx-1 text-white underline">Kateaclysm</Link>, <Link href="https://github.com/M-ARTHELL" className="text-xs mx-1 text-white underline">M-ARTHELL</Link></footer>
  )
}