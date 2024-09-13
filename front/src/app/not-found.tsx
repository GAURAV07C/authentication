import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const NotFound= () => {
  return (
    <div className='h-screen flex justify-center items-center flex-col'>
        <Image

        src='/image/404Error.svg'
        alt='error'
        width={500}
        height={500}

          />
        <Link href="/">
        <Button>Return Home</Button>


        </Link>
    </div>
  )
}

export default NotFound
