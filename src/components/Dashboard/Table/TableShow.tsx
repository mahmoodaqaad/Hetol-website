"use client"

import { Status } from '@/utils/Status'
import { User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import UnData from '../../../utils/Tools/UnData'
import PaginationPage from '../../../utils/pagination/Pagination'
import { ARTICLE_PER_PAGE, DOMAIN } from '@/utils/consant'
import Swal from 'sweetalert2'
import { ModeContext } from '@/Context/ModeContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import SearchTable from './SearchTable'
interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[]
    singleUser: User | undefined
    action: boolean
    header: { key: string; value: string }[];
    one: string,
    tow: string
    path: string
    three: string,
    four: string
    count: number
    showOtherTable: boolean
    page: number
}

const TableShow = (props: Props) => {
    const { data, singleUser, action, header, one, tow, three = "", four = "", path, page, count, showOtherTable = false } = props
    const context = useContext(ModeContext)
    if (!context) {
        throw new Error("Error in mode context")
    }
    const { isDarkmode } = context
    const router = useRouter()



    const handleUpdateStatus = async (id: number, comf: boolean) => {
        try {
            if (comf) {

                Swal.fire({
                    title: "Are you sure?",
                    text: "You want be accpet this request!",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes!",
                    background: !isDarkmode ? "#444" : "#fff",
                    color: isDarkmode ? "#333" : "#fff",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await axios.put(`${DOMAIN}/api/${path}/status//${id}`)
                        Swal.fire({
                            title: "accpted!",
                            icon: "success"
                        });

                        router.refresh()
                        toast.success("accpet Request successfully")
                    }
                })
            }
            else {
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

                        axios.delete(`${DOMAIN}/api/${path}/status/${id}`)
                        router.refresh()

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                });

            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }



    const handleDelete = async (id: number) => {

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

                    axios.delete(`${DOMAIN}/api/${path}/${id}`)
                    router.refresh()

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                catch (error: any) {
                    toast.error(error.response?.data?.message)
                }
            }

        });


    }


    const headerShow = header.map((th: { value: string }, i: number) => (
        <>
            <th key={i} className='p-2 border-gray-300 border-2'>{th.value}</th>

        </>
    ))
    const showImages = (images: []) => {
        return (

            images.map((img: { id: number, imageUrl: string }) => (
                <div
                    className='shadow-lg'
                    key={img.id}
                >

                    <Image src={img?.imageUrl}
                        unoptimized={true}

                        width={50}
                        height={50}
                        alt=''
                    />
                </div>

            ))


        )


    }

    const UpdateStatus = (data: { id: number, status: string, paidAmount: string, totalAmount: string }) => {

        const access = data.status === "active" || data.status === "pending"
        return access ?

            <div className='flex gap-2 items-center justify-center'>
                {
                    data.totalAmount === data.paidAmount &&
                    <button
                        className='text-lg p-2 bg-green-700 text-white rounded'
                        onClick={() => handleUpdateStatus(data?.id, true)}>
                        Completed
                    </button>
                }

                <button
                    onClick={() => handleUpdateStatus(data?.id, false)}
                    className='text-lg p-2 bg-red-700 text-white rounded'>
                    Canceled                                        </button>

            </div>
            : <div className='bg-blue-500 text-xl px-2 py-1 text-white text-center '>
                No Action Varible
            </div>
    }
    const Showdata = data.map((data, i) => {
        const showEditAndDelete = ((path !== "users") || (singleUser?.role === "SuperAdmin" || singleUser?.role === "Admin"))
        const IsMy = data?.id === singleUser?.id
        return (
            <tr key={i} >
                <td className='border-gray-200 border-2 p-2'>{page ? ((page - 1) * ARTICLE_PER_PAGE + 1 + i) : i + 1}</td>

                {

                    header.map((head: { key: string, value: string }, i: number) => {
                        const andYou = IsMy && path === "users" && head.key == "name"
                        return (
                            <>
                                <td key={i} className='border-gray-200 border-2 p-2'>
                                    {
                                        head.key === "images" ?
                                            <div className='flex gap-3 flex-wrap'>{showImages(data[head.key])}</div>
                                            : head.key === "price" || head.key === "totalAmount" || head.key === "paidAmount" || head.key === "remainingAmount" ? `${data[head.key]}$`
                                                : head.key === "user" ? data[head.key].name
                                                    : head.key === "room" ? data[head.key].name
                                                        : (head.value === "Total booked" && head.key === "booking") ? data[head.key].totalAmount
                                                            : head.key === "booking" ? data[head.key].room.name
                                                                : head.key === "Update Status" ? UpdateStatus(data)
                                                                    : head.key === "status" ? Status(data[head?.key], one, tow)
                                                                        : head.key === "paymentStatus" ? Status(data[head?.key], three, four)
                                                                            : head.key === "createdAt" || head.key === "checkIn" || head.key === "checkOut" ? new Date(data[head?.key]).toDateString()
                                                                                : andYou ? `${data[head.key]} (You)`
                                                                                    : data[head.key]
                                    }
                                </td>

                            </>

                        )
                    })

                }
                {showEditAndDelete &&
                    action &&
                    <td className='border-gray-200 border-2 p-2'>
                        <div className='flex gap-2 items-center justify-center'>
                            {
                                (path !== "bookings" && path !== "booking-requests") &&
                                <Link href={`/dashboard/${path}/edit/` + data?.id} className='text-sm p-2 bg-green-700 text-white rounded'>

                                    <BiEdit />
                                </Link>
                            }
                            {
                                (path !== "users" || (path === "users" && data.id !== singleUser?.id)) &&
                                <div
                                    onClick={() => handleDelete(data.id)}
                                    className='text-sm p-2 bg-red-700 text-white rounded cursor-pointer'>
                                    <FaTrash />
                                </div>
                            }
                        </div>
                    </td>
                }
            </tr >
        )
    })
    return (
        <div>

            {showOtherTable &&
                <div className='my-3 w-full md:w-1/2 lg:w-2/5 '>
                    <SearchTable path={path} />
                </div>
            }
            <table className='table w-full text-left mt-4'>

                <thead className='border-2 border-gray-300'>
                    <tr>
                        <th className='p-2 border-gray-300 border-2'>#</th>
                        {headerShow}

                        {
                            ((path !== "users") || (singleUser?.role === "SuperAdmin" || singleUser?.role === "Admin")) &&

                            action &&
                            <th className='p-2 border-gray-300 border-2'>Action</th>
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ?
                            Showdata
                            :
                            <UnData />
                    }
                </tbody>

            </table>



            {/* pagination  */}

            {(showOtherTable &&
                page) &&
                <div className='mt-5'>

                    <PaginationPage path={path} total={count} page={page} />
                </div>
            }
        </div>
    )
}

export default TableShow
