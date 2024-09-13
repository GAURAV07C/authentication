
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Register from "@/components/auth/Register";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const register = async() => {
  const session = await getServerSession(authOptions)


  if(session){
    redirect("/dashboard")
  }
  return (
    <div className="flex justify-center items-center h-screen font-bold">
      <div className="w-[550px] bg-white rounded-xl py-5 px-10 shadow-md">
        <h1 className=" text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent text-center bg-clip-text">
          ClaSh
        </h1>
        <h1 className="text-4xl font-bold ">Register</h1>
        <p className="font-bold">Welcome to clash</p>

          <Register />
        <p className="text-center mt-2 ">
            Already have an account ?{" "}
          <strong>
            <Link href="/login">Login</Link>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default register;
