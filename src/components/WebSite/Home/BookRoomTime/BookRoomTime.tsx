"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { toast } from 'react-toastify'

const BookRoomTime = () => {

    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [type, setType] = useState("")
    const [guest, setGuest] = useState("")
    const router = useRouter()
    const handleBook = async () => {
        if (!checkIn || !checkOut || !type || !guest) return toast.error("All Filed Are Requierd")
        if (new Date(checkOut).getTime() - new Date(checkIn).getTime() <= 0) return toast.error("check in is after check out")
        if ((type == "Single" && Number(guest) > 1) || (type == "Double" && Number(guest) > 2) || (type == "Deluxe" && Number(guest) > 3)) return toast.error("the Type is not match of geust")
        router.push(`/RoomFilter?checkIn=${checkIn}&checkOut=${checkOut}&type=${type}&guest=${guest}`)

    }

    return (
        <div className='bg-teal-400 dark:bg-teal-700 relative  shadow-lg rounded-lg'>
            <div className='flex flex-wrap   items-center justify-between px-3 py-4'>
                <h3 className='text-2xl font-serif text-white w-full lg:w-auto'>
                    Book A Room
                </h3>



                <div className='flex flex-wrap gap-4 mt-5 items-center justify-between'>
                    <div className='text-white w-full lg:w-auto'>
                        <p className='text-white'>In-Out Time</p>
                        <div className='flex gap-x-3 flex-wrap  items-center  justify-between gap-3 w-full'>

                            <div className=' w-full md:w-auto flex items-center justify-between'>
                                <label htmlFor="in" className='pr-4 flex items-center gap-1'>
                                    <FaLongArrowAltRight />
                                    In
                                </label>
                                <input
                                    value={checkIn}
                                    onChange={e => setCheckIn(e.target.value)}
                                    type="date" id='in' className='text-black w-full md:w-auto' />
                            </div>

                            <div className=' w-full md:w-auto  flex items-center justify-between'>
                                <label htmlFor="out" className='pr-4 flex items-center gap-1'>
                                    <FaLongArrowAltRight />
                                    Out
                                </label>
                                <input
                                    value={checkOut}
                                    onChange={e => setCheckOut(e.target.value)}
                                    type="date" id='out' className='text-black w-full md:w-auto' />
                            </div>
                        </div>
                    </div>

                    <div className='w-full lg:w-auto mt-5 lg:m-0'>
                        <p className='text-white'>Room Type</p>

                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            name="" id="" className='py-1 px-2 w-full '>
                            <option value="" disabled selected>Select you room</option>
                            <option value="Single" selected>Single Room</option>
                            <option value="Double" selected>Double Room</option>
                            <option value="Deluxe" selected>Deluxe Room</option>
                            <option value="Other" selected>Other</option>
                        </select>
                    </div>

                    <div className='w-full lg:w-auto mt-5 lg:m-0'>
                        <p className='text-white'>Guests</p>

                        <select
                            value={guest}
                            onChange={e => setGuest(e.target.value)}
                            name="" id="" className='py-1 px-2 w-full '>
                            <option value="" disabled selected>Select</option>
                            <option value="1" selected>1 Adult</option>
                            <option value="2" selected>2 Adult</option>
                            <option value="3" selected>3 Adult</option>
                            <option value="4" selected>4 Adult</option>
                            <option value="5" selected>5 Adult</option>
                            <option value="6" selected>6 Adult</option>
                        </select>
                    </div>



                </div>
                <button
                    onClick={handleBook}
                    className='w-full lg:w-auto mt-10 lg:mt-5 xl:m-0 bg-emerald-600 px-4 py-2 text-4xl italic text-white font-mono hover:bg-teal-800 '>
                    Book
                </button>
            </div>
        </div>
    )
}

export default BookRoomTime
