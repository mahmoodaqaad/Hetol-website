"use client"

import { DOMAIN } from '@/utils/consant'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logout = () => {
    const router = useRouter()
    const logoutHandler = async () => {
        try {
            await axios.post(`${DOMAIN}/api/users/logout`)

            router.replace("/login");
            router.refresh(); // مهم جداً

        } catch (error) {
            console.log(error);

        }

    }


    return (
        <button onClick={logoutHandler} className='bg-gray-700 text-gray-200 px-3 py-2 rounded text-xl hover:bg-gray-500 transition-colors'>
            Logout
        </button>
    )
}

export default Logout
