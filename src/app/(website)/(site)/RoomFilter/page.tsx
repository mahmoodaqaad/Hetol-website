

import SingleRoom from '@/components/WebSite/SingleRoom/SingleRoom'
import { DOMAIN } from '@/utils/consant'
import { RoomWithReltion } from '@/utils/Types'
import React from 'react'
interface FilterProps {
    searchParams: {
        geust: string
        checkIn: string
        checkOut: string
        type: string
    }

}
const RoomsFilter = async ({ searchParams: { geust, checkIn, checkOut, type } }: FilterProps) => {

    const response = await fetch(`${DOMAIN}/api/rooms/filter`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ geust, checkIn, checkOut, type })
    })
    if (response.status === 404) return (
        <div className='flex items-center justify-center h-screen'>

            <div className='text-red-600 text-center font-bold text-6xl italic '>
                NO RESULT
            </div>
        </div>
    )
    if (!response.ok) throw new Error("Error in fetch data filter")
    const data: RoomWithReltion[] = await response.json()

    console.log(data);







    return (
        <div className='mt-28 h-screen'>
            <div>
                <h2 className='font-semibold p-3 text-4xl uppercase font-sans'>Room Filter</h2>
            </div>
            <div className='flex  w-full  items-center flex-wrap'>

                {data.map((item, i) => (

                    <SingleRoom room={item} key={i} booking={false} />

                ))}
            </div>
        </div>
    )
}

export default RoomsFilter
