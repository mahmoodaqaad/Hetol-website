"use client"

import { LoadingBtn } from '@/app/loading'
import { ModeContext } from '@/Context/ModeContext'
import { DOMAIN } from '@/utils/consant'

import { CommentWithUser } from '@/utils/Types'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
const SingleComment = ({ item, user }: { item: CommentWithUser, user: User }) => {

    const [loading, setLoading] = useState(false)
    const context = useContext(ModeContext)
    if (!context) {
        throw new Error("Error in mode context")
    }
    const { isDarkmode } = context

    const router = useRouter()
    const handleDeleteComment = async () => {

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
                    setLoading(true)


                    await axios.delete(`${DOMAIN}/api/comments/${item.id}`)
                    router.refresh()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });


                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    console.log(error);

                    toast.error(error.response.data.message || "error in server")
                }
                finally {

                    setLoading(false)
                }
            }
        });

    }



return (
    <div className='border-white border-2 rounded-lg p-2 mt-4 '>
        <div className='flex justify-between'>

            <div className='flex-1'>
                <h1 className='text-2xl font-semibold mb-1'>{item.user.name}</h1>
                <p className='px-3 text-sm text-gray-600'>{new Date(item.createdAt).toDateString()}</p>
                <p className='p-2 text-xl'>{item.text}</p>
            </div>
            <div>
                {
                    (user.id === item.userId || (user.role === "Admin" || user.role === "SuperAdmin"))

                }
                <button
                    onClick={handleDeleteComment}
                    disabled={loading}
                    className='border-red-500 p-2 border-2 rounded-lg text-red-500 text-xl cursor-pointer transition-all hover:scale-110 '>
                    {loading ?

                        <LoadingBtn />

                        :
                        <FaTrash />
                    }
                </button>
            </div>

        </div>
    </div>
)
}

export default SingleComment
