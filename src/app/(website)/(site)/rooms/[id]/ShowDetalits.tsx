import Booking_list from '@/components/WebSite/SinglePage/Booking-list/Booking-list'
import MyGallery from '@/components/WebSite/SinglePage/Image_gallery/Image_gallery'
import SavePage from '@/components/WebSite/SinglePage/SavePage/SavePage'
import Rating from '@/utils/Rating'
import { RoomWithReltionAll } from '@/utils/Types'
import { BookingRequest, Saved, User } from '@prisma/client'
import React from 'react'

interface Porps {


    room: RoomWithReltionAll & {
        bookingRequests: BookingRequest[]
    }
    user: User

}

const ShowDetalits = ({ room, user }: Porps) => {
    return (
        <div>

            <div className='flex gap-9 justify-between p-5 flex-wrap'>
                {/* image  */}
                <div className='w-full lg:w-4/12'>
                    <MyGallery images={room.images} />

                </div>
                {/* info  */}
                <div className='flex-1'>

                    <div className=' flex items-start justify-between flex-row-reverse flex-wrap '>
                        <SavePage room={room} user={user as User & { Saved: Saved[] }} />
                        <div className='flex-1 w-full md:w-9/12'>

                            <h1 className='mb-3 text-4xl md:text-6xl font-semibold'>{room.name}</h1>

                            <p className='text-xl md:text-3xl w-full md:w-10/12 mb-2'>{room.discrption}</p>
                            <div className='border-t-2 w-fit pt-3 mt-3'>

                                <table >
                                    <tr>
                                        <td> <p className='mb-2 text-xl font-semibold tracking-widest uppercase'>Adult</p></td>
                                        <td className='text-xl font-semibold'>:</td>
                                        <td><span className='pl-1 capitalize text-2xl text-blue-500'> {room.guest} OR less</span></td>
                                    </tr>
                                    <tr>
                                        <td> <p className='mb-2 text-xl font-semibold tracking-widest uppercase'>Type</p></td>
                                        <td className='text-xl font-semibold'>:</td>
                                        <td> <span className='pl-1 capitalize text-2xl text-blue-500'> {room.roomType}</span></td>
                                    </tr>
                                    <tr>
                                        <td> <p className='mb-2 text-xl font-semibold tracking-widest uppercase'>Price</p></td>
                                        <td className='text-xl font-semibold'>:</td>
                                        <td> <span className='pl-1 capitalize text-2xl text-blue-500'> {room.price}$/Night</span></td>
                                    </tr>
                                    <tr>
                                        <td> <p className='mb-2 text-xl font-semibold tracking-widest uppercase'>Size</p></td>
                                        <td className='text-xl font-semibold'>:</td>
                                        <td> <span className='pl-1 capitalize text-2xl text-blue-500'> {room.size}m<sup>2</sup></span></td>
                                    </tr>
                                    <tr>
                                        <td> <p className='mb-2 text-xl font-semibold tracking-widest uppercase'>Veiw</p></td>
                                        <td className='text-xl font-semibold'>:</td>
                                        <td> <span className='pl-1 capitalize text-2xl text-blue-500'> {room.view}</span></td>
                                    </tr>

                                </table >
                            </div>

                        </div>

                    </div>
                    <div className='mt-6 flex gap-3 justify-center md:justify-between flex-wrap items-center '>

                        <Rating ava={room.averageRating} />

                        <Booking_list room={room} userId={user?.id} />


                    </div>
                </div >

            </div >

        </div >
    )
}

export default ShowDetalits
