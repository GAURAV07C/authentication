import Navbar from '@/components/base/Navbar'
import AddClas from '@/components/clash/AddClas'
import React from 'react'
import { authOptions, type CustomeSession } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { fetchClashs } from '../fetch/clashFetch';
import ClashCard from '@/components/clash/ClashCard';

const dashboard = async () => {
  const session:CustomeSession | null = await getServerSession(authOptions)
  const clashs:Array<ClashType> | [] = await fetchClashs(session?.user?.token!)
  return (
    <div className='container'>
        <Navbar />
        <div className=' text-end mt-10'>
          <AddClas user={session?.user!} />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 '>
            {clashs.length > 0 && clashs.map((item , index) => <ClashCard  clash={item}  key={index} token={session?.user?.token!}/>)}

          </div>



        </div>

    </div>
  )
}

export default dashboard
