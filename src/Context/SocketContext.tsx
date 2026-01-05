"use client"

import { socket } from "@/lib/socketClints";
import { Notification, User } from "@prisma/client";
import { createContext, useEffect, useState } from "react";
interface SocketContextProviderType {
    notifications: Notification[]
    setNotification: React.Dispatch<React.SetStateAction<Notification[]>>
    myUser: User

    setMyUser: React.Dispatch<React.SetStateAction<User[]>>

}
export const SocketContext = createContext<SocketContextProviderType | undefined>(undefined)

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [notifications, setNotification] = useState<Notification[]>()
    const [myUser, setMyUser] = useState<User>()

    useEffect(() => {
        if (!socket || !myUser) return

        socket.emit("addNewUser", myUser)


    }, [socket, myUser])


    useEffect(() => {


    }, [])
    // useEffect(() => {
    //     socket.on("getOnlineUser", (res: any) => {

    //         console.log("getOnlineUser client=>", res);
    //     })
    //     return () => {
    //         socket.off("getOnlineUser")
    //     }
    // }, [socket])








    useEffect(() => {
        socket.on("getNotif", data => {
            // console.log("data  =>", data);
            setNotification(prev => [data, ...prev])
        })

    }, [socket])
    return (<SocketContext.Provider value={{ notifications, setNotification, myUser, setMyUser }} >

        {children}
    </SocketContext.Provider >
    )
}