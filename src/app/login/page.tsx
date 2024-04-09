import Header from "@/components/Header"
import Footer from "@/components/Footer"
import {Image, Button, Input} from "@nextui-org/react";

export default function Login() {
  return (
    <div className="dark:bg-teal-800 flex flex-col min-h-screen">
      <Header/>
      <main className="flex justify-evenly flex-grow items-center">
        <Image width={500} alt="blah" src="/image/blah.png"/>
        <form className="flex flex-col bg-gray-300 text-2xl p-44 space-y-9">
          <h1 className="text-4xl font-semibold">Welcome Back!</h1>
          <Input classNames={{label: "text-black/100 dark:text-white/90"}} color="secondary" size="lg" type="email" label="Email Address" labelPlacement="outside" placeholder="Input Your Email" isRequired isClearable/>
          <Input classNames={{label: "text-black/100 dark:text-white/90"}} color="secondary" size="lg" type="email" label="Password" labelPlacement="outside" placeholder="Input Your Password" isRequired isClearable/>
          <Button color="primary">Login</Button>
        </form>
      </main>
      <Footer/>
    </div>
  )
}