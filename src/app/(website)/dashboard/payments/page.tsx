import { Booking, Payment, User } from '@prisma/client'
// import Link from 'next/link'
import React from 'react'
import Table from './Table'
import { GetPaymentCount, GetPayments } from '@/apiCall/Payment'
import { SearchProps } from '@/utils/Types'
type PaymentProps = Payment & {
  user: User
  booking: Booking & {
    room: {
      name: string
    }
  }
}
const BookingRequestPage = async ({ searchParams: { pageNumber } }: SearchProps) => {
  const payments: PaymentProps[] = await GetPayments(pageNumber)
  const count: number = await GetPaymentCount()

  return (
    <section >
      <div className='flex items-center justify-between px-2 '>
        <h1 className='text-4xl font-semibold'>Payments</h1>
        {/* <Link href={"/dashboard/payments/addpayment"} className='bg-indigo-700  text-white px-3 py-2 text-xl rounded hover:bg-indigo-500 transition-all  '>add Payment</Link> */}
      </div>
      <Table action={true} payments={payments} count={count} pageNumber={Number(pageNumber)} />

    </section>
  )
}

export default BookingRequestPage
