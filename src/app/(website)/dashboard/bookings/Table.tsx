import TableShow from '@/components/Dashboard/Table/TableShow'

import { BookingWithRelations, tableProps } from '@/utils/Types'


const Table = ({ Booking, action = true, pageNumber = 1, count }: {
    Booking: BookingWithRelations[],
} & tableProps) => {




   




    const head = [
        { key: "id", value: "ID" },
        { key: "user", value: "User name" },
        { key: "room", value: "Room name" },
        { key: "status", value: "Status" },
        { key: "paymentStatus", value: "paymentStatus" },
        { key: "totalAmount", value: "totalAmount" },
        { key: "paidAmount", value: "paidAmount" },
        // { key: "remainingAmount", value: "remainingAmount" },
        { key: "checkIn", value: "checkIn" },
        { key: "checkOut", value: "checkOut" },
        { key: "createdAt", value: "Created At" },
        { key: "Update Status", value: "Update Status" },
        // { key: "Action", value: "Action" },

    ]
    return (
        <div className='overflow-auto'>
            <div className='overflow-auto'>
                <TableShow action={action}
                    page={Number(pageNumber)}
                    count={count}
                    path='bookings'
                    one='canceled'
                    tow='completed'
                    three='failed'
                    four='paid'
                    data={Booking} header={head}
                    singleUser={undefined} />

            </div>

        </div >

    )
}

export default Table
