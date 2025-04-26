import Link from 'next/link'
import React from 'react'
import { BiComment, BiEdit, BiHome, BiLock, BiSolidBookmark } from 'react-icons/bi'
import { FaBed, FaClipboardList } from 'react-icons/fa'
const profileLinks = [
  {
    label: "Home",
    Icon: BiHome, // بدون أقواس
    href: ""
  },
  {
    label: "My Booking",
    Icon: FaBed,
    href: "booking"
  },
  {
    label: "My Booking Request",
    Icon: FaClipboardList,
    href: "requests"
  },
  {
    label: "Edit My info",
    Icon: BiEdit,
    href: "edit"
  },
  {
    label: "Saved",
    Icon: BiSolidBookmark,
    href: "saved"
  },
  {
    label: "My Comment",
    Icon: BiComment,
    href: "comments"
  },
  {
    label: "Change Password",
    Icon: BiLock,
    href: "change-password"
  }
];
const SideBar = () => {
    return (
      <div className="fixed z-2 md:sticky pt-[104px] h-screen transition-all  top-0 left-0 bg-gray-100 shadow-lg overflow-y-auto dark:bg-slate-800 dark:text-white ">
            <div className='p-3'>
                <h1 className='text-3xl mb-2'>Profile</h1>
                <div className='border-t-2'>

            {
              profileLinks.map(({ href, Icon, label }, i) => (
                <Link href={`/profile/${href}`} key={i} className='border-b-2 py-4 px-1 flex items-center gap-4 text-xl'>
                  <Icon />
                  <p>{label}</p>
                </Link>
              ))
            }
                  
                </div>
            </div>
        </div >
    )
}

export default SideBar