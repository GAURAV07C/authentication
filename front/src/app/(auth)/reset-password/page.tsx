import ResetPassword from '@/components/auth/ResetPassword'
import React from 'react'

const forgetPassword = () => {
  return (
    <div className='flex justify-center items-center h-screen font-bold' >
    <div className='w-[550px] bg-white rounded-xl py-5 px-10 shadow-md'>
    <h1 className=' text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent text-center bg-clip-text'>ClaSh</h1>
        <h1 className='text-4xl font-bold '>Reset Password</h1>

        <ResetPassword />



        <p className='text-center mt-2 '>Don't have an account ? {" "}


        </p>

    </div>
</div>
  )
}

export default forgetPassword
