"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoReload } from 'react-icons/io5'

const SearchTable = ({ path }: { path: string }) => {
    const params=useSearchParams()
    const [search, setSearch] = useState(params.get("search")||"")
    const router = useRouter()
    const handleSearch = async (e:React.FormEvent) => {
        try {
e.preventDefault()
            if (!search) {
                setSearch("")
                return router.push(`/dashboard/${path}?pageNumber=1}`)
            }
            router.push(`/dashboard/${path}?search=${search}`)

        } catch (error) {
            console.log(error);

        }

    }
    const handleNotSearch = (e: React.FormEvent) => {
        try {
            e.preventDefault()

            router.push(`/dashboard/${path}?pageNumber=1`)

            setSearch("")
        } catch (error) {
            console.log(error);

        }

    }
    return (

            <form action="">
        <div className='flex gap-1 items-center'>

                <div className=' flex-1'>
                    <input type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder='Search'
                        className='p-2 rounded border-2 outline-0 w-full ' />
                </div>

                <button
                    onClick={handleSearch}
                    className='text-2xl bg-sky-500 text-white p-2 rounded hover:scale-110 transition-all'><FaSearch />
                </button>
            {
                search &&
                <div
                onClick={handleNotSearch}
                className='text-2xl bg-sky-500 text-white p-2 rounded hover:scale-110 transition-all'>
                    <IoReload />
                </div>
            }

        </div>
            </form>
    )
}

export default SearchTable
