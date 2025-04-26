"use client";

import { NavBarContext } from '@/Context/navBarContext'
import React, { useContext } from 'react'
import { FaBarsStaggered } from 'react-icons/fa6'

const Bar = () => {
    const { showbar, setShowBar } = useContext(NavBarContext)

    return (
        <div className='block lg:hidden text-2xl cursor-pointer' onClick={() => setShowBar(!showbar)}>
            <FaBarsStaggered />
        </div>
    )
}

export default Bar
