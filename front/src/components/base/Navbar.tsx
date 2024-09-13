'use client'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from '../common/UserAvatar'
import LogoutDialouge from '../auth/LogoutDialoge'


const Navbar = () => {
  const [open, setOpen] = useState(false)
  return (
  <>
  <LogoutDialouge open={open} setOpen={setOpen} />

    <nav  className='flex justify-between items-center h-14 p-2 w-full'>
        <h1 className=' text-4xl  font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text'>ClaSh</h1>
        <DropdownMenu>
  <DropdownMenuTrigger>
    <UserAvatar />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setOpen(true)}>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


    </nav>

    </>
  )
}

export default Navbar
