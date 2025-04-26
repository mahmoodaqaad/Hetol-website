import Image from 'next/image'
import React from 'react'
import { FaExpandAlt } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { Room, RoomImage } from '@prisma/client'
import Link from 'next/link'
const SingleRoom = ({ room, booking = true }: { room: Room & { images: RoomImage[] }, booking: boolean }) => {

    return (
        <div className='bg-gray-200 shadow-xl relative p-3 rounded-lg h-[380px]   overflow-hidden'>
            <Link href={`/rooms/${room.id}`} className='relative '>

                <Image
                    width={400}
                    height={250}
                    src={room.images[0].imageUrl} alt='' className='object-cover mx-auto h-[200px]' />
                {
                    booking &&
                    room.status == "booked" &&
                    <div className='absolute top-0 left-0 px-12    text-center py-1 text-white  bg-blue-400 -rotate-45 -translate-x-[3.6rem] translate-y-2 text-xl tracking-[2px] '>
                        Booked
                    </div>
                }
            </Link>
            <div className='px-3 py-2 text-1xl '>
                <p>
                    ${Number(room.price)}/NIGHT
                </p>
                <div className='flex items-center justify-between mt-3'>

                    <div className='flex items-center flex-wrap gap-3'>

                        <div className='flex items-center  gap-1'>
                            <h2 className='flex items-center font-semibold gap-1 '>
                                <FaExpandAlt />
                                <p>Size</p>
                            </h2>:<p>{room.size}m<sup>2</sup></p>
                        </div>

                        <div className='flex items-center  gap-1'>
                            <h2 className='flex items-center font-semibold gap-1 '>
                                <FaUser />
                                <p>Adult</p>
                            </h2>
                            :<p>{room.guest}</p>
                        </div>

                        <div className='flex items-center  gap-1'>
                            <h2 className='flex items-center font-semibold gap-1 '>
                                <MdOutlineRemoveRedEye />

                                <p>Veiw</p>
                            </h2>
                            :<p>{room.view}</p>
                        </div>
                    </div>
                    <Link href={`/rooms/${room.id}`} className='bg-teal-400 px-4 py-2 uppercase text-white'>
                        More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SingleRoom
