"use client"
import Link from 'next/link';

import { GrDashboard } from 'react-icons/gr';
import { links } from './NavLink';
import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { DashboardContext } from '@/Context/DashboardContext';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { User } from '@prisma/client';

const SideBar = ({ user }: { user: User }) => {
    const context = useContext(DashboardContext)
    if (!context) {
        throw new Error("")
    }
    const { showSidebar, setShowSidebar } = context
    const path = usePathname()
    return (
        <div className={`fixed z-50 md:sticky transition-all h-screen top-0 left-0 bg-gray-100 shadow-lg overflow-y-auto dark:bg-slate-800 dark:text-white  ${!showSidebar ? "muins-trnsalte" : ""}`}>
            <div className='mb-2 sticky top-0  mt-2 py-4 px-6 text-3xl flex items-center gap-2 bg-gray-100 dark:bg-slate-800 border-b-2 z-50 border-gray-200'>

                <Link href="/dashboard" className='text-3xl flex items-center gap-2'>
                    <GrDashboard className={`text-4x ${path === "/dashboard" ? "text-blue-600" : ""}`} />

                    {
                        showSidebar &&

                        <h2 className={`font-semibold transition-all ${path === "/dashboard" ? "text-blue-600" : ""}`}>Dashboard</h2>
                    }
                </Link>
                <div
                    onClick={() => {
                        setShowSidebar(prev => !prev)
                    }
                    }
                    className='text-3xl block md:hidden  text-teal-600 cursor-pointer hover:scale-125 transition-all'
                >
                    <FaArrowLeftLong />
                </div >
            </div>

            <div className=" flex flex-col mt-1 ">

                {
                    links.map(({ href, Icon, label, allowedRole }, i) => (
                        allowedRole.includes(user.role) &&
                        <Link href={href}
                            key={i}
                            className={`flex items-center gap-3 px-3 py-4   text-center text-lg
                            ${path === href ? "bg-blue-600 text-white" :
                                    "hover:bg-gray-200 dark:hover:bg-gray-400"
                                }

               transition-colors ${!showSidebar && "justify-center"}`}>
                            <Icon className="text-2xl" />
                            {
                                showSidebar &&
                                <p className='transition-all'>
                                    {label}
                                </p>
                            }
                        </Link>

                    ))
                }

            </div>
        </div >
    );
}

export default SideBar;
