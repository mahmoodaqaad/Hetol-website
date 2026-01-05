"use client"

import { Status } from '@/utils/Status'
import { User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState, useTransition } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import UnData from '../../../utils/Tools/UnData'
import PaginationPage from '../../../utils/pagination/Pagination'
import { ARTICLE_PER_PAGE, DOMAIN } from '@/utils/consant'
import Swal from 'sweetalert2'
import { ModeContext } from '@/Context/ModeContext'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import SearchTable from './SearchTable'
import { socket } from '@/lib/socketClints'

// ... existing interfaces ...
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

const FilterConfig: Record<string, { key: string, options: string[] }> = {
    "users": { key: "Role", options: ["SuperAdmin", "Admin", "Manager", "User"] },
    "rooms": { key: "Status", options: ["available", "booked", "requested"] },
    "bookings": { key: "Status", options: ["active", "completed", "canceled"] },
    "booking-requests": { key: "Status", options: ["pending", "approved", "rejected"] },
}

const TableShow = (props: Props) => {
    const { data, singleUser, action, header, one, tow, three = "", four = "", path, page, count, showOtherTable = false } = props
    const [onlineUser, setOnlineUser] = useState<(User & { socketId: string })[]>([])
    const [isPending, startTransition] = useTransition()

    const context = useContext(ModeContext)
    // const SocketContextLine = useContext(SocketContext)
    if (!context) {
        throw new Error("Error in mode context")
    }
    const { isDarkmode } = context
    const router = useRouter()





    useEffect(() => {
        socket.on("getOnlineUser", (res) => {

            setOnlineUser(res)
        })
        return () => {
            socket.off("getOnlineUser")
        }
    }, [socket])

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
                        // if (path === "booking-requests") {
                        //     router.push("/dashboard/booking-requests/add-payment")
                        // }
                        // else {

                        const res = await axios.put(`${DOMAIN}/api/${path}/status/${id}`)
                        console.log(res);

                        Swal.fire({
                            title: "accpted!",
                            icon: "success"
                        });

                        router.refresh()
                        toast.success("accpet Request successfully")
                        // }
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
                    confirmButtonText: "Yes",
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
    console.log(onlineUser);

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
                                                        : head.key === "email" ? (
                                                            <div className='flex items-center gap-2'>
                                                                <span>{data[head.key]}</span>
                                                                {onlineUser.some(u => u.id === data.id) && (
                                                                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                                                                )}
                                                            </div>
                                                        )
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
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState(searchParams.get("filter") || "")

    useEffect(() => {
        setFilter(searchParams.get("filter") || "")
    }, [searchParams])

    const handleSort = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        startTransition(() => {
            router.push(`/dashboard/${path}?${params.toString()}`);
        })
    }

    return (
        <div>

            {showOtherTable &&
                <div className='my-3 w-full flex flex-col md:flex-row gap-4 items-center justify-between'>
                    <div className='w-full md:w-1/2 lg:w-2/5'>
                        <SearchTable path={path} />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <select
                            onChange={(e) => handleSort("sort", e.target.value)}
                            disabled={isPending}
                            defaultValue={searchParams.get("sort") || "createdAt"}
                            className='p-2 border rounded bg-white dark:bg-gray-800 dark:text-white disabled:opacity-50'
                        >
                            <option value="createdAt">Date</option>
                            <option value="totalAmount">Amount</option>
                            <option value="status">Status</option>
                        </select>
                        <select
                            onChange={(e) => handleSort("order", e.target.value)}
                            disabled={isPending}
                            defaultValue={searchParams.get("order") || "desc"}
                            className='p-2 border rounded bg-white dark:bg-gray-800 dark:text-white disabled:opacity-50'
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        {FilterConfig[path] && (
                            <div className='flex gap-1'>
                                <select
                                    onChange={(e) => setFilter(e.target.value)}
                                    value={filter}
                                    disabled={isPending}
                                    className='p-2 border rounded bg-white dark:bg-gray-800 dark:text-white disabled:opacity-50'
                                >
                                    <option value="">All {FilterConfig[path].key}</option>
                                    {FilterConfig[path].options.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => handleSort("filter", filter)}
                                    disabled={isPending}
                                    className='p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-75 disabled:cursor-not-allowed min-w-[80px]'
                                >
                                    {isPending ? "Loading..." : "Filter"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            }
            <table className={`table w-full text-left mt-4 ${isPending ? 'opacity-50 transition-opacity' : ''}`}>
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
