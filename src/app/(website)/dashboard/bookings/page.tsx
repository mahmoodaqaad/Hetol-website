import Link from 'next/link'
import React from 'react'
import Table from './Table'
import { GetBooking, getBookingCount } from '@/apiCall/Booking'
import { BookingWithRelations, SearchProps } from '@/utils/Types'


const BookingPage = async ({ searchParams }: SearchProps) => {
  const { pageNumber, search = "", sort = "", order = "", filter = "" } = await searchParams
  const Booking: BookingWithRelations[] = await GetBooking(pageNumber, search, sort, order, filter)
  const count: number = await getBookingCount()

  return (
    <section >
      <div className='flex items-center justify-between px-2 '>
        <h1 className='text-4xl font-semibold'>Booking</h1>
        <Link href={"/dashboard/bookings/addBook"} className='bg-indigo-700  text-white px-3 py-2 text-xl rounded hover:bg-indigo-500 transition-all  '>add Book</Link>
      </div>
      <Table showOtherTable={true} pageNumber={Number(pageNumber)}
        count={count}

        Booking={Booking} action={true} />

    </section>
  )
}

export default BookingPage
