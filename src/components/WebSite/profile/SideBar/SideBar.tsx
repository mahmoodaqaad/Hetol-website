"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiComment, BiEdit, BiHome, BiLock, BiSolidBookmark } from 'react-icons/bi'
import { FaBed, FaClipboardList } from 'react-icons/fa'
const profileLinks = [
  {
    label: "Home",
    Icon: BiHome, // بدون أقواس
    href: "/profile//"
  },
  {
    label: "My Booking",
    Icon: FaBed,
    href: "/profile/booking"
  },
  {
    label: "My Booking Request",
    Icon: FaClipboardList,
    href: "/profile/requests"
  },

  {
    label: "Saved",
    Icon: BiSolidBookmark,
    href: "/profile/saved"
  },
  {
    label: "My Comment",
    Icon: BiComment,
    href: "/profile/comments"
  },
  {
    label: "Edit My info",
    Icon: BiEdit,
    href: "/profile/edit"
  },
  {
    label: "Change Password",
    Icon: BiLock,
    href: "/profile/changePassword"
  }
];
const SideBar = () => {
  const path = usePathname()

  return (
    <div className="fixed w-full bottom-0 z-2 md:sticky md:pt-[86px] lg:pt-[104px] md:h-screen transition-all  md:top-0 md:left-0 bg-gray-100 shadow-lg overflow-x-auto md:overflow-y-auto dark:bg-slate-800 dark:text-white ">
      <div className=''>
        <h1 className='text-3xl mb-2 p-2 mt-2 hidden md:block '>Profile</h1>
        <div className='border-t-2'>
          <div className='flex  md:gap-0 md:flex-col justify-between md:justify-normal'>

            {
              profileLinks.map(({ href, Icon, label }, i) => (
                <Link

                  href={href} key={i} className={`w-full justify-center md:justify-normal border-b-2 py-4 px-2 flex items-center gap-2 text-xl   
                hover:bg-gray-200 transition-all
                ${href === path && "bg-gray-200"
                    }
                `}>
                  <div className='scale-110 text-2xl px-1 md:px-0 '>

                    <Icon />
                  </div>
                  <p className='hidden md:block'>{label}</p>
                </Link>
              ))
            }

          </div>
        </div>

      </div>
    </div >
  )
}

export default SideBar