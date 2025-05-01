import { LoadingBtn } from '@/app/loading'
import { DOMAIN } from '@/utils/consant'
import { Todo } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

const Form = ({ userId, setTodos }: { userId: number, setTodos: React.Dispatch<React.SetStateAction<Todo[]>> }) => {
    const [title, setTitle] = useState("")

    const [discrption, setDiscrption] = useState("")

    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const AddTask = async (e: FormEvent) => {
        e.preventDefault()
        try {

            if (!title) return toast.error("Title is required")
            if (!discrption) return toast.error("Discrption is required")
            setLoading(true)
            const res = await axios.post(`${DOMAIN}/api/todo`, { userId, title, discrption })

            toast.success("Todo Added")
            setTodos((prev) => [res.data, ...prev])
            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }

    }

    return (
        <form onSubmit={AddTask}>
            <div className='flex flex-col gap-3'>
                <div className='flex w-full gap-3'>
                    <input type="text" placeholder='Title...'

                        className='p-4 w-full border rounded-md dark:bg-transparent'
                        value={title}
                        onChange={e => setTitle(e.target.value)}

                    />
                    <button disabled={loading} type='submit' className='bg-green-500 px-5 py-1 text-2xl font-semibold rounded-lg text-white disabled:bg-green-200 disabled:cursor-wait transition-all'>
                        {
                            loading ?
                                <LoadingBtn /> : "Add"

                        }
                    </button>
                </div>
                <input type="text"
                    placeholder='discrpiton...'
                    className='p-4 border rounded-md dark:bg-transparent'
                    value={discrption}
                    onChange={e => setDiscrption(e.target.value)}
                />
            </div>
        </form >

    )
}

export default Form
