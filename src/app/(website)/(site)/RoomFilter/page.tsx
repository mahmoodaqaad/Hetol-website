

import Header from '@/components/WebSite/header/Header'
import SearchRoom from '@/components/WebSite/Rooms/SearchRoom/SearchRoom'
import SingleRoom from '@/components/WebSite/Rooms/SingleRoom/SingleRoom'
import { DOMAIN } from '@/utils/consant'
import { RoomWithReltionAll } from '@/utils/Types'
import React from 'react'
interface FilterProps {
    searchParams: {
        guest: string
        checkIn: string
        checkOut: string
        type: string
    }

}
const RoomsFilter = async ({ searchParams: { guest, checkIn, checkOut, type } }: FilterProps) => {

    const response = await fetch(`${DOMAIN}/api/rooms/filter`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ guest, checkIn, checkOut, type })
    })
    if (response.status === 404) return (
        <div className='flex items-center justify-center h-screen'>

            <div className='text-red-600 text-center font-bold text-6xl italic '>
                NO RESULT
            </div>
        </div>
    )
    if (!response.ok) throw new Error("Error in fetch data filter")
    const data: RoomWithReltionAll[] = await response.json()








    return (
        <div className='mt-28 h-screen'>
            <Header />
            <div>
                <h2 className='font-semibold p-3 text-4xl uppercase font-sans dark:text-white'>Room Filter</h2>
            </div>
<SearchRoom/>
            <div className='flex  w-full  items-center flex-wrap'>

                {data.map((item, i) => (
                    <div key={i} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'>

                        <SingleRoom room={item} key={i} booking={false} />
                    </div>

                ))}
            </div>
        </div>
    )
}

export default RoomsFilter
