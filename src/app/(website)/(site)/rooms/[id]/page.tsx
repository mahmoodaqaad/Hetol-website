import { getSingleRoom } from '@/apiCall/Rooms'
import { RoomWithReltionAll } from '@/utils/Types'

import React from 'react'
import ShowDetalits from './ShowDetalits'
import CommentAndReting from './CommentAndReting'
import { varfiyMyAccount, } from '@/utils/verfiyToken'
import { BookingRequest, User } from '@prisma/client'
import Header from '@/components/WebSite/header/Header'


interface SingleArticlesPageProps {
    params: { id: string }
}


const page = async ({ params }: SingleArticlesPageProps) => {

    const room: RoomWithReltionAll & {
        bookingRequests: BookingRequest[]
    } = await getSingleRoom(params.id)
    const user = await varfiyMyAccount() as User;




    return (
        <>
            <Header />

            <div className='vh-100 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-50 bg-opacity-40 pt-28'>
            <div className='p-4 md:p-8'>
                <ShowDetalits room={room} user={user} />

                <CommentAndReting room={room} user={user} />

            </div>
        </div>
        </>
    )
}

export default page
