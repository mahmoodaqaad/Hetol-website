"use client"

import { ModeContext } from '@/Context/ModeContext'
import { DOMAIN } from '@/utils/consant'
import { BookingRequest, Room } from '@prisma/client'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const Booking_list = ({ room, userId }: { room: Room & { bookingRequests: BookingRequest[] }, userId: number }) => {

  const BookRequst = room.bookingRequests.find(item => item.roomId == room.id && item.userId === userId)
  const [IsBookIt, setIsBookIt] = useState(room.bookingRequests.some(item => item.roomId == room.id && item.userId === userId))
  const [ShowMenu, setShowMenu] = useState(false)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const context = useContext(ModeContext)
  if (!context) {
    throw new Error("Error in mode context")
  }
  const { isDarkmode } = context
  const handleBook = async (e: React.FormEvent) => {

    e.preventDefault()
    try {
      if (IsBookIt) return toast.error("you can not sent many request ")
      if (!checkIn || !checkOut) toast.error("All Fileds Are Reqiured")
      if (new Date(checkOut).getTime() - new Date(checkIn).getTime() <= 0) return toast.error("check in is after check out")

      await axios.post(`${DOMAIN}/api/booking-requests`, {
        userId,
        roomId: room.id,
        checkIn,
        checkOut
      })
      setIsBookIt(true)
      setShowMenu(false)
      Swal.fire({
        title: "Request Book Success",
        icon: "success",

      })
      toast.success("add request successfully")
    } catch (error) {
      console.log(error);

    }
  }

  const handleCancelBook = async () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        background: !isDarkmode ? "#444" : "#fff",
        color: isDarkmode ? "#333" : "#fff",

      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.patch(`${DOMAIN}/api/booking-requests/status/${BookRequst?.id}`)
      setIsBookIt(false)
            Swal.fire({
              title: "Cancled!",
              text: "Your Request is cancled.",
              icon: "success"
            });

          } catch (error) {
            console.log(error);

          }
        }
      })
    }
    return (
      <div>

        {
          ShowMenu &&
          <div className='fixed top-0 z-50 left-0 w-full h-screen bg-gray-900 bg-opacity-60 flex justify-center items-center'>

            <div className='relative px-10 py-9 max-w-[90%] bg-gray-400 bg-opacity-95 rounded-lg '>
              <div className='text-red-600 text-3xl absolute top-2 right-2 cursor-pointer hover:scale-110 transition-all ' onClick={() => setShowMenu(false)}>
                <CgClose />
              </div>

              <div>
                <h1 className='font-semibold text-4xl text-white mt-5 font-mono text-center'>Request Menu</h1>
                <div className='mt-3 text-center'>
                  <form action="">

                    <div className='flex items-center justify-between flex-wrap md:flex-nowrap text-white text-2xl'>
                      <label htmlFor="in" className='pr-4 flex items-center gap-1'>
                        <FaLongArrowAltRight />
                        In
                      </label>
                      <input
                        value={checkIn}
                        onChange={e => setCheckIn(e.target.value)}
                        type="date" id='in' className=' bg-transparent px-3 text-3xl py-1 outline-none border-2 mb-5 rounded-lg' />
                    </div>

                    <div className='flex items-center justify-between flex-wrap md:flex-nowrap text-white text-2xl'>
                      <label htmlFor="out" className='pr-4 flex items-center gap-1'>
                        <FaLongArrowAltRight />
                        Out
                      </label>
                      <input
                        value={checkOut}
                        onChange={e => setCheckOut(e.target.value)}
                        type="date" id='out' className=' bg-transparent px-3 text-3xl py-1 outline-none border-2 mb-2 rounded-lg' />
                    </div>

                    <button


                      onClick={handleBook}
                      className='bg-white mt-4 py-3 px-5 rounded tracking-widest text-2xl cursor-pointer hover:bg-teal-200 transition-all'>
                      Book Now

                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        }
        {
          IsBookIt ?
            <div
              onClick={handleCancelBook}
              className='bg-red-700 text-white p-3 rounded-lg text-3xl cursor-pointer hover:bg-red-200 transition-all'>
              Cancle Book
            </div>
            : <div
              onClick={() => setShowMenu(true)}
              className='bg-teal-700 text-white p-3 rounded-lg text-3xl cursor-pointer hover:bg-teal-200 transition-all'>
              Book Now

            </div>
        }

      </div>
    )
  }

  export default Booking_list
