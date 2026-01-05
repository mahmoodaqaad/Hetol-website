"use client"
import { DOMAIN } from '@/utils/consant'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AddForm = () => {

    const [userId, setUserId] = useState("")
    const [roomId, setRoomId] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")

    const [user, setUser] = useState<{ name: string, id: number }[]>([])

    const [room, setRoom] = useState<{ name: string, id: number }[]>([])

    useEffect(() => {
        axios.get(`${DOMAIN}/api/users/name_id`).then((res) => {
            setUser(res.data);

        })
        axios.get(`${DOMAIN}/api/rooms/name_id`).then((res) => {
            setRoom(res.data);

        })
    }, [])

    const userOption = user.map(user => (
        <option value="" key={user.id}>{user.name}</option>
    ))
    const RoomOption = room.map(room => (
        <option value="" key={room.id}>{room.name}</option>
    ))

    const router = useRouter()


    const handleNext = () => {

        if (!userId) return toast.error("userId is required");
        if (!roomId) return toast.error("roomId is required");
        if (!checkIn) return toast.error("checkIn is required");
        if (!checkOut) return toast.error("checkOut is required");

        router.push(`/dashboard/bookings/addBook/payment?userId=${userId}&roomId=${roomId}&checkIn=${(checkIn)}&checkOut=${(checkOut)}`)
    }
    return (
        <form className='mt-3 border-t border-gray-300 text-center'>
            <div className='mt-6'>

                <select
                    className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-800'
                    onChange={e => setUserId(e.target.value)}>
                    <option value="" disabled selected>Select User</option>

                    {userOption}
                </select>

            </div>
            <div className='mt-6'>

                <select
                    className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-800'
                    onChange={e => setRoomId(e.target.value)}>
                    <option value="" disabled selected>Select Room</option>

                    {RoomOption}
                </select>

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
            <button type="button" onClick={handleNext} className='bg-teal-400 hover:bg-teal-600 transition-colors duration-150 px-6 py-2 rounded-md  text-2xl text-white mt-10 '>Next</button>
        </form>
    )
}

export default AddForm
