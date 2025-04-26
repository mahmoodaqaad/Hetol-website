import SingleRoom from '@/components/WebSite/SingleRoom/SingleRoom'
import { varfiyMyAccount } from '@/utils/verfiyToken'
import { Booking, Room, RoomImage, User } from '@prisma/client'
import React from 'react'

const page = async () => {
    const user: User & { bookings: Booking & { room: Room & { images: RoomImage[] } }[] } = await varfiyMyAccount()
    console.log(user);

    return (
        <div className='pt-[104px]'>

            <div className='text-3xl font-mono mb-2'>
                My Booking
            </div>

            <div className='flex flex-wrap '>
                {
                    user.bookings.map((item, i) => (
                        <div key={i} className='w-full sm:w-1/2 md:w-1/3 p-5'>

                            <SingleRoom key={i} booking={false} room={item.room} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default page
