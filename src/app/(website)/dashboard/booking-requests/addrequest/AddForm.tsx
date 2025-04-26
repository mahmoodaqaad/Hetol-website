"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { DOMAIN } from '@/utils/consant'

const AddForm = () => {
    const [userId, setUserId] = useState("")
    const [roomId, setRoomId] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const router = useRouter()

    const AddUser = async (e: React.FormEvent) => {
        e.preventDefault()

        try {


            if (!userId) return toast.error("userId is required");
            if (!roomId) return toast.error("roomId is required");
            if (!checkIn) return toast.error("checkIn is required");
            if (!checkOut) return toast.error("checkOut is required");

            await axios.post(`${DOMAIN}/api/booking-requests`, {
                userId,
                roomId,
                checkIn,
                checkOut
            })
            toast.success("add request successfully")
            router.push("/dashboard/booking-requests?pageNumber=1")
            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {

            console.log(e);

            return toast.error(e.response.data.message)

        }

    }
    return (
        <form onSubmit={AddUser} className='mt-3 border-t border-gray-300 text-center'>
            <div className='mt-6'>

                <input
                    type="number"
                    placeholder='user Id... '
                    className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-800'
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                />
            </div>
            <div className='mt-7'>

                <input
                    type="number"
                    placeholder='Room Id... '
                    className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-800'
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                />
            </div>


            <div className='mt-7'>

                <input
                    type="date"
                    className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-800'
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)} />
            </div>
            <div className='mt-7'>

                <input
                    type="date"
                    className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-800'
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)} />
            </div>
            <button type="submit" className='bg-teal-400 hover:bg-teal-600 transition-colors duration-150 px-6 py-2 rounded-md  text-2xl text-white mt-10 '>Add</button>
        </form>
    )
}

export default AddForm
