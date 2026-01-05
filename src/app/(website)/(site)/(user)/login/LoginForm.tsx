"use client"

import { socket } from '@/lib/socketClints'
import { DOMAIN } from '@/utils/consant'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()



    const Login = async (e: React.FormEvent) => {
        e.preventDefault()

        try {


            if (!email) return toast.error("Email is required");
            if (!password) return toast.error("password is required");

            const res: { id: string } = await axios.post(`${DOMAIN}/api/users/login`, { email, password })
            const user = res?.data.user

            socket.emit("addNewUser", user)


            router.replace("/")
            router.refresh()
            toast.success("Login Successfully, Welcom")

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {

            console.log(e);

            return toast.error(e.response.data.message)

        }

    }
    return (
        <form onSubmit={Login} className='mt-3 border-t border-gray-300'>
            <div className='mt-6'>

                <input
                    type="email"
                    name='email'
                    placeholder='Email... '
                    className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-600 dark:text-gray-100'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className='mt-7'>

                <input
                    type="Password"
                    name='password'
                    placeholder='Password... '
                    className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-600 dark:text-gray-100'
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className='bg-teal-400 hover:bg-teal-600 transition-colors duration-150 px-6 py-2 rounded-md text-2xl text-white mt-10 '>Login</button>
        </form>
    )
}

export default LoginForm
