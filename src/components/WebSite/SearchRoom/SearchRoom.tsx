"use client"

import { DOMAIN } from '@/utils/consant'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import Search from '../SearchShow/Search'
import { useRouter } from 'next/navigation'

const SearchRoom = () => {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([])
    const router = useRouter()
    useEffect(() => {


        const handleSeach = async () => {
            try {
                const res = await axios.post(`${DOMAIN}/api/rooms/search`, { search })
                setResult(res.data)
            } catch (error) {
                console.log(error);
            }


        }
        let timeOut: NodeJS.Timeout
        if (!isNaN(Number(search))) {
            handleSeach()

        }
        else {
            timeOut = setTimeout(() => {

                handleSeach()
            }, 100);
        }
        return () => clearTimeout(timeOut)
    }, [search])


    console.log(result);

    const handleSeachOnClick = async () => {

        try {
            router.push(`/rooms/search?search=${search}`)
        } catch (error) {
            console.log(error);


        }


    }
    return (
        <div className='bg-gray-100 p-4  text-center'>
            <div className='flex items-center gap-3 '>

                <input
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value)
                    }}
                    type="text" className='p-4 w-full md:w-2/5 border-0 outline-0' placeholder='Search Room...' />
                <button
                    onClick={handleSeachOnClick}
                    className='bg-teal-400 p-3 text-2xl hover:scale-110 transition-all hover:bg-teal-600'>
                    <BiSearch className=' text-white' />
                </button>

            </div>
            <Search result={result} />
        </div>
    )
}

export default SearchRoom
