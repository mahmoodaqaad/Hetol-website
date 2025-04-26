"use client"

import { Notification, User } from '@prisma/client'
import { useEffect, useState } from 'react'

const Notifiction = ({ user }: { user: User & { Notification: Notification[] } }) => {


    const [notifications, setNotifications] = useState<Notification[]>(user.Notification)



    return (
        <div className='bg-red-400 p-3 w-[300px] text-white rounded-lg'>
            {
                notifications.map((item, i) => (
                    <div key={i} className="mb-2 border-b border-white pb-1">{item.message}</div>
                ))
            }
        </div>
    )
}

export default Notifiction
