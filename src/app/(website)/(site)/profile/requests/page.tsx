import SingleRoom from '@/components/WebSite/SingleRoom/SingleRoom'
import { BookingRequestWithRelations } from '@/utils/Types'
import { varfiyMyAccount } from '@/utils/verfiyToken'
import { BookingStatus, Room, RoomImage, User } from '@prisma/client'
import React from 'react'

const page = async () => {
    const user: User & { bookingRequests: BookingRequestWithRelations & { status: BookingStatus, room: Room & { images: RoomImage[] } }[] } = await varfiyMyAccount()
    console.log(user);

    return (
        <div className='pt-[104px]'>

            <div className='text-3xl font-mono mb-2'>
                My Booking Requset
            </div>

            <div className='flex'>
                {
                    user.bookingRequests.map((item, i) => (
                        <div key={i} className='  p-4 w-full sm:w-1/2 lg:w-1/3  '>

                            <SingleRoom booking={false} room={item.room} status={item.status} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default page
