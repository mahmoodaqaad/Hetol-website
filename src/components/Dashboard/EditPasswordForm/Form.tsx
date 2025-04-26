

import { DOMAIN } from '@/utils/consant'
import axios from 'axios'
import React, { FormEvent, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'

const Form = ({ setShowMore }: { setShowMore: React.Dispatch<SetStateAction<boolean>> }) => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")

    const handleEdit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            if (!oldPassword) return toast.error("oldPassword is Requied")
            if (!newPassword1) return toast.error("new Password is Requied")
            if (!newPassword2) return toast.error("newPassword again is Requied")
            if (oldPassword.length < 6) return toast.error("oldPassword is minumam 6")
            if (newPassword1.length < 6) return toast.error("newPassword is minumam 6")
            if (newPassword2.length < 6) return toast.error("newPassword again is minumam 6")

            if (newPassword1 !== newPassword2) return toast.error("this new passwords is not match")
            if (oldPassword === newPassword1) return toast.error("the old password is same a new password")


            await axios.put(`${DOMAIN}/api/users/password`, {
                old: oldPassword,
                new: newPassword1
            })
            toast.success("Password is updated")
            setShowMore(false)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data.message)
        }

    }


    return (
        <form action="" onSubmit={handleEdit} className='text-center'>
            <table className='w-full'>

                <tr>
                    <td className=''>

                        <label htmlFor=""
                            className='
                            text-xl '>
                            Old pass
                        </label>
                    </td>
                    <td>
                        :
                    </td>
                    <td className=
                        'pb-3'>
                        <input type="password"
                            className='flex-1 py-2 border-none px-2 w-full dark:bg-gray-600 rounded-lg'
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                        />
                    </td>
                </tr>

                <tr>
                    <td className=''>
                        <label htmlFor=""
                            className='
                            text-xl '>
                            New pass
                        </label>
                    </td>
                    <td>
                        :
                    </td>

                    <td className='pb-3'>
                        <input type="password"
                            className='flex-1 py-2 border-none px-2 w-full dark:bg-gray-600 rounded-lg'
                            value={newPassword1}
                            onChange={e => setNewPassword1(e.target.value)}
                        />

                    </td>
                </tr>


                <tr>
                    <td className=''>
                        <label htmlFor=""
                            className='
                            text-xl '>
                            New pass
                        </label>
                    </td>
                    <td>
                        :
                    </td>

                    <td className='pb-3'>
                        <input type="password"
                            className='flex-1 py-2 border-none px-2 w-full dark:bg-gray-600 rounded-lg'
                            value={newPassword2}
                            onChange={e => setNewPassword2(e.target.value)}
                        />

                    </td>
                </tr>

            </table>


            <button className='bg-green-500 text-white py-1 px-4 mt-5 text-2xl rounded ' >
                Edit
            </button>
        </form>
    )
}

export default Form
