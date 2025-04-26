import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchRoom = () => {
    return (
        <div className='bg-gray-100 p-4 mt-20 text-center'>
            <div className='flex items-center gap-3 '>

                <input type="text" className='p-4 w-2/5 border-0 outline-0' placeholder='Search Room...' />
                <button className='bg-teal-400 p-3 text-2xl hover:scale-110 transition-all hover:bg-teal-600'>
                    <BiSearch className=' text-white' />
                </button>

            </div>
        </div>
    )
}

export default SearchRoom
