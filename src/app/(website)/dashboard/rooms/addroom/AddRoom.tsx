"use client"
import { LoadingPage } from '@/app/loading'
import { User } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { LuImagePlus } from 'react-icons/lu'
import { toast } from 'react-toastify'

const AddRoom = ({ user }: { user: User }) => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [discrption, setDiscrption] = useState("")
    const [images, setImages] = useState<File[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()



    const AddRoomHanlde = async (e: React.FormEvent) => {
        e.preventDefault()

        try {

            if (user.role === "Admin" || user.role === "SuperAdmin") {

                if (!name) return toast.error("Name is required");
                if (!price) return toast.error("price is required");
                if (!discrption) return toast.error("discrption is required");
                if (images.length === 0) return toast.error("images is required");

                setLoading(true)
                // const imagesUrls=await up 
                const uplpadProductImgs = []
                const uploadPromises = images.map(async (image) => {
                    const formData = new FormData()

                    formData.append("file", image)
                    formData.append("upload_preset", "HotelWithNext")
                    formData.append("cloud_name", "ddoj9gsda")
                    const res = await axios.post(`https://api.cloudinary.com/v1_1/ddoj9gsda/image/upload`, formData);

                    return res.data.secure_url;
                })
                const urls = await Promise.all(uploadPromises)

                uplpadProductImgs.push(...urls)
                await axios.post("http://localhost:3000/api/rooms", { name, price, discrption, imageUrls: uplpadProductImgs })
                router.push("/dashboard/rooms?pageNumber=1")
                router.refresh()
            }
            else {
                toast.error("Not allowed ,forbeddien")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {

            console.log(e);

            return toast.error(e.response.data.message)

        } finally {
            setLoading(false)
        }

    }



    return (
        <>
            {loading && <LoadingPage />}

            <form onSubmit={AddRoomHanlde} className='mt-3 border-t border-gray-300 text-center'>
                <div className='mt-6'>
                    <input type="text"
                        name='name'
                        placeholder='Name... '
                        className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-800'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='mt-7'>
                    <input type="text"
                        name='discrption'
                        placeholder='Discrption... '
                        className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-800'
                        value={discrption}
                        onChange={e => setDiscrption(e.target.value)}
                    />
                </div>


                <div className='mt-7'>

                    <input
                        type="number"
                        placeholder='Price... '
                        className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-800'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>


                <div className='mt-7'>
                    <label htmlFor="images"
                        className='flex justify-center items-center p-4 border-2 border-gray-500 cursor-pointer'

                    >
                        <LuImagePlus className='text-3xl' />
                    </label>
                    <input
                        id='images'
                        hidden
                        type="file"
                        multiple
                        onChange={e =>
                            setImages(prev => [...prev, ...Array.from(e.target.files || [])])

                        } />
                </div>
                <button type="submit" className='bg-teal-400 hover:bg-teal-600 transition-colors duration-150 px-6 py-2 rounded-md  text-2xl text-white mt-10 '>Add</button>
            </form>

            <div className='flex gap-3 mt-6 flex-col items-center'>

                {

                    images && images.map((img, i) => {

                        function deleteImg(img: File) {

                            const newImg = images.filter(item => item !== img)
                            setImages(newImg)

                        }

                        return (
                            <div
                                key={i}
                                className='border-2 flex justify-between items-center py-2 px-2 border-gray-700 w-full dark:border-gray-400'
                            >
                                <div>

                                    <Image
                                        height={120}
                                        width={120}
                                        src={URL.createObjectURL(img)} alt='' />

                                    <p className='mt-2 text-blue-600 text-center'>
                                        {
                                            Number(img.size / 1024) > 1000 ?
                                                (img.size / 1024 / 1024).toFixed(1) + "MB"
                                                :
                                                (img.size / 1024).toFixed(1) + "KB"


                                        }
                                    </p>

                                </div>

                                <div>
                                    <button
                                        onClick={() => deleteImg(img)}
                                        className='bg-red-500 uppercase px-3 py-2 rounded-md text-white transition-all hover:bg-red-800  '
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    )
                }
            </div>
        </>

    )
}

export default AddRoom
