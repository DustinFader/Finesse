import Header from "@/components/Header"
import Footer from "@/components/Footer"
import {Image} from "@nextui-org/react";

export default function Login() {
  return (
    <div className="dark:bg-teal-800 flex flex-col min-h-screen">
      <Header/>
      <main className="flex justify-evenly flex-grow items-center">
        <Image width={500} alt="blah" src="/image/blah.png"/>
        <form className="flex flex-col bg-gray-300">
          <h1>Welcome Back.</h1>
          <label>Email Address</label>
          <input placeholder="Email Address"></input>
          <label>Password</label>
          <input placeholder="Password"></input>
          <button>Login</button>
        </form>
      </main>
      <Footer/>
    </div>
  )
}