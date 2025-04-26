"use "

import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'

const BookRoomTime = () => {
    return (
        <div className='bg-teal-400 relative my-[-10px] shadow-lg lg:w-2/3 w-11/12 mx-auto rounded-lg'>
            <div className='flex flex-wrap   items-center justify-between px-3 py-4'>
                <h3 className='text-2xl font-serif text-white w-full lg:w-auto'>
                    Book A Room
                </h3>



                <div className='flex flex-wrap gap-4 mt-5 items-center justify-between'>
                    <div className='text-white w-full lg:w-auto'>
                        <p className='text-white'>In-Out Time</p>
                        <div className='flex gap-x-3 flex-wrap  items-center  justify-between gap-3 w-full'>

                            <div className='flex items-center justify-between'>
                                <label htmlFor="in" className='pr-4 flex items-center gap-1'>
                                    <FaLongArrowAltRight />
                                    In
                                </label>
                                <input type="date" id='in' className='text-black' />
                            </div>

                            <div className='flex items-center justify-between'>
                                <label htmlFor="out" className='pr-4 flex items-center gap-1'>
                                    <FaLongArrowAltRight />
                                    Out
                                </label>
                                <input type="date" id='out' className='text-black' />
                            </div>
                        </div>
                    </div>

                    <div className='w-full lg:w-auto mt-5 lg:m-0'>
                        <p className='text-white'>Room Type</p>

                        <select name="" id="" className='py-1 px-2 w-full '>
                            <option value="" disabled selected>Select you room</option>
                            <option value="Single" selected>Single Room</option>
                            <option value="Double" selected>Double Room</option>
                            <option value="Deluxe" selected>Deluxe Room</option>
                            <option value="Single" selected>Single Room</option>
                        </select>
                    </div>

                    <div className='w-full lg:w-auto mt-5 lg:m-0'>
                        <p className='text-white'>Guests</p>

                        <select name="" id="" className='py-1 px-2 w-full '>
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
                <button className='w-full lg:w-auto mt-10 lg:m-0 bg-emerald-600 px-4 py-2 text-4xl italic text-white font-mono hover:bg-teal-800 '>
                    Book
                </button>
            </div>
        </div>
    )
}

export default BookRoomTime
