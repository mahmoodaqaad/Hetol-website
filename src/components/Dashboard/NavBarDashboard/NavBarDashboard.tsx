import Logout from '@/components/Auth/Logout/Logout'
import { varfiyMyAccount } from '@/utils/verfiyToken'
import Link from 'next/link'
import React from 'react'
import { BiUser } from 'react-icons/bi'
import Bar from './Bar'
import ThemeMode from './ThemeMode'
import { User } from '@prisma/client'
import { socket } from '@/lib/socketClints'
import NotifictionPage from '@/components/Notifiction/NotifictionPage'

const TopBar = async () => {
    const user: User & { Notification: Notification[] } = await varfiyMyAccount()

    socket.emit("addNewUser", user)

    return (
        <div className='  shadow-lg bg-gray-100 p-3 dark:bg-slate-950 '>

            <div className='flex flex-col sm:flex-row justify-between md:items-center '>

                <div className='flex gap-2 w-full justify-start items-center '>
                    <Bar />

                    <p className='p-4 text-lg '>
                        <span className='text-yellow-600 font-semibold text-2xl'>
                            {user?.name}
                        </span>{" "}
                        ({user?.role})
                    </p>

                </div>
                <div className='flex items-center gap-4 justify-end sm:justify-start'>
                    <ThemeMode />

                    <NotifictionPage user={user} />
                    <Link href={"/dashboard/profile"} className='text-3xl text-green-900 cursor-pointer hover:scale-125 transition-all'>
                        <BiUser />

                    </Link>
                    <Logout />

                </div>
            </div>

        </div>
    )
}

export default TopBar
