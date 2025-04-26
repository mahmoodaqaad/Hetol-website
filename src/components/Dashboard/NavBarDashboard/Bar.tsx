"use client"
import { DashboardContext } from '@/Context/DashboardContext'
import React, { useContext } from 'react'
import { FaBars } from 'react-icons/fa6'

const Bar = () => {
    const context = useContext(DashboardContext)

    if (!context) {
        throw new Error("Bar component must be used within a DashboardContextProvider")
    }

    const { setShowSidebar } = context

    return (
        <>
            <div
                onClick={() => {
                    setShowSidebar(prev => !prev)
                }
                }
                className='text-3xl text-teal-600 cursor-pointer hover:md:scale-125 transition-all'
            >
                <FaBars />
            </div >
       
        </>
    )
}

export default Bar
