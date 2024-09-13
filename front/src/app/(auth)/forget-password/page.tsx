import ForgetPassword from '@/components/auth/ForgetPassword'
import React from 'react'

const forgetPassword = () => {
  return (
    <div className='flex justify-center items-center h-screen font-bold' >
    <div className='w-[550px] bg-white rounded-xl py-5 px-10 shadow-md'>
    <h1 className=' text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent text-center bg-clip-text'>ClaSh</h1>
        <h1 className='text-4xl font-bold '>Forget Password</h1>
        <p className='font-bold'>Don't worry it happens.Just type your registered email below. we
        will send you the reset email.</p>

        <ForgetPassword />



        <p className='text-center mt-2 '>Don't have an account ? {" "}


        </p>

    </div>
</div>
  )
}

export default forgetPassword
