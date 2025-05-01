"use client"
import { NavBarContext } from '@/Context/navBarContext'
import Link from 'next/link'
import React, { useContext } from 'react'
import stay from "./header.module.css"
import Logout from '../Logout/Logout'
import { User } from '@prisma/client'
const NavBar = ({ user }: { user: User }) => {
    const context = useContext(NavBarContext)

    if (!context) throw new Error("error in context nav bar")
    const { showbar, setShowBar } = context

    return (
        <div className={`${stay.navLinks} flex items-center pr-12  ${showbar ? stay.showLink : ""}`}>
            <Link onClick={() => { setShowBar(false); }} className='px-2 text-lg text-red-100' href={"/"}>Home</Link>
            <Link onClick={() => { setShowBar(false); }} className='px-2 text-lg text-red-100' href={"/rooms"}>Our Rooms</Link>
            <Link onClick={() => { setShowBar(false); }} className='px-2 text-lg text-red-100' href={"/restaurant"}>Restaurant</Link>
            <Link onClick={() => { setShowBar(false); }} className='px-2 text-lg text-red-100' href={"/about"}>About Us</Link>
            <Link onClick={() => { setShowBar(false); }} className='px-2 text-lg text-red-100' href={"/blog"}>Blog</Link>
            <Link onClick={() => { setShowBar(false); }} className='px-2 text-lg text-red-100' href={"/contact"}>Contact</Link>
            {
                user &&

                < div className='md:hidden py-4'>

                    {

                        (user &&(user.role === "SuperAdmin" || user.role === "Admin" || user.role === "Manager"))
                        &&
                        <Link className='bg-sky-500   text-white px-3 py-2' href={"/dashboard"}>dashboard</Link>
                    }



                    <div className='mt-5'>
                        <Logout />
                    </div >
                </div>
            }
        </div>
    )
}

export default NavBar
