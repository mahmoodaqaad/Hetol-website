import SingleRoom from '@/components/WebSite/Rooms/SingleRoom/SingleRoom'
import { BookingRequestWithRelations, RoomWithReltionAll } from '@/utils/Types'
import { varfiyMyAccount } from '@/utils/verfiyToken'
import { User } from '@prisma/client'
import React from 'react'

const page = async () => {
    const user: User & { bookingRequests: (BookingRequestWithRelations & { room: RoomWithReltionAll })[] } = await varfiyMyAccount()

    return (
        <div className='pt-[86px] lg:pt-[104px] '>

            <div className='text-3xl font-mono mb-2'>
                My Booking
            </div>

            <div className='flex flex-wrap '>
                {
                    user.bookingRequests.map((item, i) => (
                        <div key={i} className='w-full sm:w-1/2 xl:w-1/3 p-2 sm:p-4'>

                            <SingleRoom booking={false} room={item.room} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default page
