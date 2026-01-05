import { getRoomsBySearch } from '@/apiCall/Rooms'
import SearchRoom from '@/components/WebSite/Rooms/SearchRoom/SearchRoom'
import SingleRoom from '@/components/WebSite/Rooms/SingleRoom/SingleRoom'
import { RoomWithReltionAll } from '@/utils/Types'
import React from 'react'

const SearchPage = async ({ searchParams: { search } }: { searchParams: { search: string } }) => {

    const rooms: RoomWithReltionAll[] = await getRoomsBySearch(search)

    console.log(rooms);

    return (
        <div className='pt-[86px] lg:pt-[104px]  vh-100'>
            <SearchRoom />
            <div className='flex flex-wrap'>
                {
                    rooms.length > 0 ?
                        rooms.map((room, i) => (
                            <div key={i} className='w-full p-5 sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <SingleRoom booking={true} room={room} />

                            </div>
                        )) :
                        <div className='vh-site flex justify-center items-center w-full text-2xl md:text-6xl font-semibold'>
                            No Result For your Search
                        </div>
                }

            </div>

        </div>
    )
}

export default SearchPage
