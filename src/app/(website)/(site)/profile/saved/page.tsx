import SingleRoom from '@/components/WebSite/SingleRoom/SingleRoom'
import { varfiyMyAccount } from '@/utils/verfiyToken'
import {  Room, RoomImage, Saved, User } from '@prisma/client'
import React from 'react'

const page = async () => {
    const user: User & { Saved: Saved & { room: Room & { images: RoomImage[] } }[] } = await varfiyMyAccount()
    console.log(user);

    return (
        <div className='pt-[104px]'>

            <div className='text-3xl font-mono mb-2'>
                Saved
            </div>

            <div className='flex'>
                {
                    user.Saved.map((item, i) => (
                        <div key={i} className='  p-4 w-full sm:w-1/2 lg:w-1/3  '>

                            <SingleRoom booking={false} room={item.room} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default page
