"use client"

import React, { useEffect, useState } from 'react'
import SingleRoom from '../SingleRoom/SingleRoom'
import SearchRoom from '../SearchRoom/SearchRoom'
import { RoomWithReltionAll } from '@/utils/Types'
import { LoadingBtn } from '@/app/loading'
import axios from 'axios'
import { DOMAIN } from '@/utils/consant'

const Rooms = ({ count }: { count: number }) => {

    const [rooms, setRooms] = useState<RoomWithReltionAll[]>([])
    const [offset, setOffset] = useState(1)

    const [laoding, setLoading] = useState(false)
    const [lastOn, setLoastOn] = useState(false)
    useEffect(() => {

        const x = async () => {
            try {
                setLoading(true)
                const r = await axios.get(`${DOMAIN}/api/rooms?pageNumber=${offset}`)

                if (rooms?.length > 0) {
                    setRooms((prev) => [...prev, ...r.data])
                    if (rooms.length === count) {
                        setLoastOn(true)
                    }
                }
                else {
                    setRooms(r.data)
                }
            } catch (error) {
                console.log(error);

            }
            finally {
                setLoading(false)
            }
        }

        if (!lastOn) {
            x()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset])


    return (
        <div className='text-center'>
            <SearchRoom />
            <div className='py-3'>

                <div className='flex mt-10 justify-between md:justify-start items-center flex-wrap text-start '>
                    {
                        rooms?.map((item, i) => (
                            <div key={i} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'>
                                <SingleRoom room={item} booking={true} />
                            </div>
                        ))
                    }
                </div>
                {
                    rooms.length !== count &&
                    <button
                        onClick={() => setOffset(offset + 1)}
                        className='mx-auto rounded mt-4 bg-emerald-700  px-6 py-3 text-2xl text-white '
                        disabled={laoding}
                    >

                        {laoding ? <LoadingBtn /> : "Show More"}
                    </button>
                }
            </div >
        </div>

    )
}

export default Rooms
