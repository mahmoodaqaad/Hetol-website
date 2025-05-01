import Link from 'next/link'
import React from 'react'
import { getRooms, getRoomsCount } from '@/apiCall/Rooms'
import { User } from '@prisma/client'
import Table from './Table'
import { varfiyTokenForPage } from '@/utils/verfiyToken'
import { RoomWithReltion, SearchProps } from '@/utils/Types'

const UserPage = async ({ searchParams: { pageNumber, search = "" } }: SearchProps) => {
  const rooms: RoomWithReltion[] = await getRooms(pageNumber, search)
  const count: number = await getRoomsCount()
  const SignUser = await varfiyTokenForPage() as User
  return (
    <section >
      <div className='flex items-center justify-between px-2 '>
        <h1 className='text-4xl font-semibold'>Rooms</h1>
        {(SignUser?.role === "SuperAdmin" || SignUser?.role === "Admin") &&

          <Link href={"/dashboard/rooms/addroom"} className='bg-indigo-700  text-white px-3 py-2 text-xl rounded hover:bg-indigo-500 transition-all  '>add Room</Link>
        }      </div>
      <Table showOtherTable={true} count={count} rooms={rooms} user={SignUser} pageNumber={Number(pageNumber)} action={true} />

    </section>
  )
}

export default UserPage
