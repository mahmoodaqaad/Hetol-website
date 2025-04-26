

"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const Register = async (e: React.FormEvent) => {
        e.preventDefault()

        try {


            if (!name) return toast.error("Name is required");
            if (!email) return toast.error("Email is required");
            if (!password) return toast.error("password is required");

            await axios.post("http://localhost:3000/api/users/register", { name, email, password })
            router.replace("/")
            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {

            console.log(e);

            return toast.error(e.response.data.message)

        }

    }
    return (
        <form onSubmit={Register} className='mt-3 border-t border-gray-300'>
            <div className='mt-6'>

                <input
                    type="text"
                    name='name'
                    placeholder='Name... '
                    className='px-2 py-3 w-full border-0 outline-0'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className='mt-7'>

                <input
                    type="email"
                    name='email'
                    placeholder='Email... '
                    className='px-2 py-3 w-full border-0 outline-0'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className='mt-7'>

                <input
                    type="Password"
                    name='password'
                    placeholder='Password... '
                    className='px-2 py-3 w-full border-0 outline-0'
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className='bg-teal-400 hover:bg-teal-600 transition-colors duration-150 px-6 py-2 rounded-md text-2xl text-white mt-10 '>Register</button>
        </form>
    )
}



export default RegisterForm
