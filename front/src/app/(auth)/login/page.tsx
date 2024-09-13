
import Login from '@/components/auth/Login'
import Link from 'next/link'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const login = async () => {
  const session = await getServerSession(authOptions)


  if(session){
    redirect("/dashboard")
  }

  return (
    <div className='flex justify-center items-center h-screen font-bold' >
        <div className='w-[550px] bg-white rounded-xl py-5 px-10 shadow-md'>
        <h1 className=' text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent text-center bg-clip-text'>ClaSh</h1>
            <h1 className='text-4xl font-bold '>Login</h1>
            <p className='font-bold'>Welcome Back</p>
            <Login />


            <p className='text-center mt-2 '>Don't have an account ? {" "}

                <strong>
                    <Link href="/register">Register</Link>
                </strong>
            </p>

        </div>
    </div>
  )
}

export default login
