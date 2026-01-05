import Link from 'next/link'
import React from 'react'
import { BsInstagram, BsWhatsapp, BsYoutube } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='bg-gray-500 p-3'>
            <div className='flex items-center text-white justify-center md:justify-between flex-wrap  '>
                <div className='w-full sm:p-3 sm:w-1/2 md:w-1/3 text-center md:text-left '>
                    Copyright © Your Website 2025
                </div>
                <div className='w-full sm:p-3 sm:w-1/2 md:w-1/3 text-center mt-5 sm:mt-0 '>
                    Distributed By <span className='text-sky-500'>Mahmood aqaad</span>
                </div>
                <div className="w-full sm:p-3 sm:w-full md:w-1/3 flex gap-3 justify-center md:justify-end mt-5 md:mt-0 ">
                    <Link className='rounded-full bg-green-500 w-8 h-8 text-lg flex justify-center items-center hover:scale-125 transition-transform' href="https://wa.me/+970599923041" target="_blank">
                        <BsWhatsapp />
                    </Link>

                    <Link className='rounded-full bg-red-600 w-8 h-8 text-lg flex justify-center items-center hover:scale-125 transition-transform' href="https://youtube.com/@user-lf6oy5cq8s" target="_blank">
                        <BsYoutube />
                    </Link>

                    <Link className='rounded-full bg-pink-500 w-8 h-8 text-lg flex justify-center items-center hover:scale-125 transition-transform' href="https://www.instagram.com/dev._mahmood/" target="_blank">
                        <BsInstagram />
                    </Link>

                    <Link className='rounded-full bg-blue-600 w-8 h-8 text-lg flex justify-center items-center hover:scale-125 transition-transform' href="https://www.facebook.com/profile.php?id=100022618519064" target="_blank" >
                        <FaFacebookF />
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Footer
