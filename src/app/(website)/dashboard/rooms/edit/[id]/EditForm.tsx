"use client"
import { LoadingPage } from '@/app/loading'
import { ModeContext } from '@/Context/ModeContext'
import { DOMAIN } from '@/utils/consant'
import { Room } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { LuImagePlus } from 'react-icons/lu'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const EditRoom = ({ room }: { room: Room }) => {
    const context = useContext(ModeContext)
    if (!context) {
        throw new Error("error in context mode in edit form")

    }
    const [name, setName] = useState(room.name)
    const [price, setPrice] = useState(Number(room.price))
    const [discrption, setDiscrption] = useState(room.discrption)
    const [imagesServer, setImagesServer] = useState<[]>(room.images)
    const [images, setImages] = useState<File[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { isDarkmode } = context



    const showImageFromServer = imagesServer.map((img: { imageUrl: string, id: string }, i: number) => {



        async function deleteImgFromServer(id: string) {
            try {

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
                        await axios.delete(`${DOMAIN}/api/rooms/images/${id}`)
                        const newImgServer = imagesServer.filter((img: { id: string }) => img.id !== id)

                        setImagesServer(newImgServer as [])
                    }
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.log(error);
                toast.error(error.response.data.message)
            }

        }
        return (

            <div
                key={i}
                className='border-2 flex justify-between items-center py-2 px-2 border-gray-700 w-full dark:border-gray-400'
            >
                <div>

                    <Image
                        unoptimized={true}

                        height={120}
                        width={120}
                        src={img.imageUrl} alt='' />


                </div>

                <div>
                    <button
                        onClick={() => deleteImgFromServer(img.id)}
                        className='bg-red-500 uppercase px-3 py-2 rounded-md text-white transition-all hover:bg-red-800  '
                    >
                        Delete
                    </button>
                </div>
            </div>


        )
    })

    const EditRoom = async (e: React.FormEvent) => {
        e.preventDefault()

        try {


            if (!name) return toast.error("Name is required");
            if (!price) return toast.error("price is required");
            // if (images.length === 0) return toast.error("images is required");

            setLoading(true)
            // const imagesUrls=await up 
            const uplpadProductImgs = []
            if (images.length) {

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
            }
            await axios.put(`http://localhost:3000/api/rooms/${room.id}`, { name, price, discrption, imageUrls: uplpadProductImgs })
            router.push("/dashboard/rooms?pageNumber=1")
                        toast.success("Edit User successfully")
            
            router.refresh()
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

            <form onSubmit={EditRoom} className='mt-3 border-t border-gray-300 text-center'>
                <div className='mt-6'>

                    <input
                        type="text"
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
                <button type="submit" className='bg-teal-400 hover:bg-teal-600 transition-colors duration-150 px-6 py-2 rounded-md  text-2xl text-white mt-10 '>Edit</button>
            </form>
            {/* new img  */}
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

            {/* old img  */}

            <div className=''>
                {
                    images && showImageFromServer
                }


            </div>
        </>

    )
}

export default EditRoom
