"use client"
import { DOMAIN } from '@/utils/consant'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const EditForm = ({ user, ShowRole = true, redirect = true }: { user: User, ShowRole: boolean, redirect: boolean }) => {
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [role, setRole] = useState(user.role as string)
    const [loading, setLoading] = useState(false)
    const router = useRouter()



    const AddUser = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setLoading(true)

            if (!name) return toast.error("Name is required");
            if (!email) return toast.error("Email is required");
            if (!role) return toast.error("role is required");

            await axios.put(`${DOMAIN}/api/users/${user.id}`, { name, email, role })
            if (redirect) {

                router.push("/dashboard/users?pageNumber=1")

                router.refresh()
            }
            toast.success("Edit User successfully")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {

            console.log(e);

            return toast.error(e.response.data.message)

        }
        finally {

            setLoading(false)
        }
    }
    return (
        <form onSubmit={AddUser} className='mt-3 border-t border-gray-300 text-center'>
            <div className='mt-6'>

                <input
                    type="text"
                    name='name'
                    placeholder='Name... '
                    className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-800'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className='mt-7'>

                <input
                    type="email"
                    name='email'
                    placeholder='Email... '
                    className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-800'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            {ShowRole

                &&
                <div className='mt-7'>

                    <select
                        className='px-2 py-3 w-full border-0 outline-0 dark:bg-gray-800'
                        value={role}
                        onChange={e => setRole(e.target.value)} >

                        <option value="" disabled>Role</option>
                        <option value="SuperAdmin">SuperAdmin</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="User">User</option>

                    </select>
                </div>
            }

            <button disabled={loading} type="submit" className='bg-teal-400 hover:bg-teal-600 transition-colors duration-150 px-6 py-2 rounded-md  text-2xl text-white mt-10 disabled:bg-teal-200 disabled:cursor-wait '>Edit</button>
        </form>
    )
}

export default EditForm
