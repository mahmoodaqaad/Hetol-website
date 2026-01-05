"use client"

import { User } from '@prisma/client'
import UsersTable from '@/app/(website)/dashboard/users/Table'
import RoomTable from '@/app/(website)/dashboard/rooms/Table'
import BookingTable from '@/app/(website)/dashboard/bookings/Table'
import BookingRequestTable from '@/app/(website)/dashboard/booking-requests/Table'
import { BookingRequestWithRelations, BookingtWithRelations, RoomWithReltion } from '@/utils/Types'

const Tables = ({
    singleUser,
    Users,
    Room,
    Booking,
    BookingRequest,
}: {
    singleUser: User
    Users: User[]
    Room: RoomWithReltion[]
    Booking: BookingtWithRelations[]
    BookingRequest: BookingRequestWithRelations[]
}) => {




    return (
        <div className='flex flex-col gap-4 '>
            <div className='shadow-lg  py-7 px-5 '>
                <h1 className='mb-3 font-semibold text-4xl'>
                    Users
                </h1>
                <UsersTable SignUser={singleUser} action={false} users={Users} />
            </div>

            <div className='shadow-lg  py-7 px-5 '>
                <h1 className='mb-3 font-semibold text-4xl'>
                    Rooms
                </h1>
                <RoomTable action={false} user={singleUser} rooms={Room} />
            </div>

            <div className='shadow-lg  py-7 px-5 '>
                <h1 className='mb-3 font-semibold text-4xl'>
                    Booking
                </h1>
                <BookingTable Booking={Booking} action={false} />
            </div>

            <div className='shadow-lg  py-7 px-5 '>
                <h1 className='mb-3 font-semibold text-4xl'>
                    Booking Request
                </h1>
                <BookingRequestTable requests={BookingRequest} action={false} />
            </div>
        </div>
    )
}

export default Tables
