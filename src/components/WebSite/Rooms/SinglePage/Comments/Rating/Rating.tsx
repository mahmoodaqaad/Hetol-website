"use client"

import Loading from '@/app/loading'
import { ModeContext } from '@/Context/ModeContext'
import { DOMAIN } from '@/utils/consant'
import { Room, User } from '@prisma/client'
import axios from 'axios'
import { redirect, useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const Rating = ({ room, user }: { room: Room, user: User }) => {

    const [rating, setRating] = useState(0); // حالة لتخزين التقييم
    const [hover, setHover] = useState<number | null>(null);
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const context = useContext(ModeContext)
    if (!context) throw new Error("error in rating context")
    const { isDarkmode } = context
    const handleRating = async () => {


        try {
            if (!user) {
                toast.error("you are not log in")
                // router.replace("/login")
            }
            else {

                if (!user) {
                    toast.error("You Are Not log in ,must be log in")
                    redirect("/login")
                }
                setLoading(true)
                await axios.post(`${DOMAIN}/api/Rating`, { roomId: room.id, userId: user.id, rating })
                router.refresh()
                Swal.fire({
                    title: "Thank You For Rating!",
                    icon: "success",
                    background: !isDarkmode ? "#444" : "#fff",
                    color: isDarkmode ? "#333" : "#fff",
                });
            }
        } catch (error) {
            console.log(error);

        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <Loading />}
            <div className='p-2 mb-5 flex gap-5'>

                <div className='flex gap-3 items-center flex-1'>
                    {
                        [1, 2, 3, 4, 5].map((star, index) => (

                            <div key={index} className='cursor-pointer text-3xl '
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(null)}
                            >


                                {star ?
                                    <FaStar style={{
                                        color: (hover || rating) >= star ? '#FFD700' : '#ccc', // اللون الأصفر عند التحديد
                                        transition: 'color 0.2s ease-in-out',
                                    }}

                                        key={index} />
                                    :
                                    <FaRegStar style={{
                                        color: (hover || rating) >= star ? '#FFD700' : '#ccc', // اللون الأصفر عند التحديد
                                        transition: 'color 0.2s ease-in-out',
                                    }}
                                        key={index} />
                                }

                            </div>

                        ))
                    }
                </div>
                <div>
                    <button
                        onClick={handleRating}
                        className='bg-teal-400 px-5 py-2 text-2xl text-white'>Sent</button>
                </div>

            </div>
        </>
    )
}

export default Rating