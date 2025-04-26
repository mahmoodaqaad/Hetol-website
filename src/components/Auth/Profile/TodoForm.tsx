"use client"

import { ModeContext } from '@/Context/ModeContext'
import { DOMAIN } from '@/utils/consant'
import { Todo } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useContext, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const TodoForm = ({ userId, todo }: { userId: number, todo: Todo[] }) => {
    const context = useContext(ModeContext)
    if (!context) {
        throw new Error("Error in mode context")
    }
    const { isDarkmode } = context
    const [todos, setTodos] = useState(todo)

    const [title, setTitle] = useState("")
    const [discrption, setDiscrption] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const AddTask = async (e: FormEvent) => {
        try {
            e.preventDefault()
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


    const handleToggleStatus = async (id: number) => {
        try {

             axios.put(`${DOMAIN}/api/todo/myTodo/${id}`)
            setTodos((prev) =>
                prev.map((todo) =>
                    todo.id === id ? { ...todo, status: todo.status === "completed" ? "pending" : "completed" } : todo
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTodo = async (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            background: !isDarkmode ? "#444" : "#fff",
            color: isDarkmode ? "#333" : "#fff",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {


                    await axios.delete(`${DOMAIN}/api/todo/myTodo/${id}`)
                    setTodos(prev => prev.filter(item => item.id !== id))

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });




                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    console.log(error);

                    toast.error(error.response?.data?.message)
                }
            }
        })
    }

    return (
        <div>
            <form onSubmit={AddTask}>
                <div className='flex flex-col gap-3'>
                    <div className='flex w-full gap-3'>
                        <input type="text" placeholder='Title...'

                            className='p-4 w-full border rounded-md'
                            value={title}
                            onChange={e => setTitle(e.target.value)}

                        />
                        <button disabled={loading} type='submit' className='bg-green-500 px-5 py-1 text-2xl font-semibold rounded-lg text-white disabled:bg-green-200 disabled:cursor-wait transition-all'>Add</button>
                    </div>
                    <input type="text"
                        placeholder='discrpiton...'
                        className='p-4 border rounded-md'
                        value={discrption}
                        onChange={e => setDiscrption(e.target.value)}
                    />
                </div>
            </form >


            <div className='mt-5'>
                <div className='border-t-2 border-gray-500'>

                    {


                        todos.map((item) => (
                            <div
                                key={item.id}
                                className='flex items-start gap-2 p-3 border'
                            >
                                <div className='flex gap-1  items-center w-full'>

                                    <input type="checkbox" width={30} checked={item.status == "completed"}
                                        onChange={() => handleToggleStatus(item.id)}
                                        id={"title" + item?.id}
                                    />
                                    <div className='w-full'>

                                        <label htmlFor={"title" + item?.id} className='w-full block cursor-pointer'>

                                            <p className={`text-2xl ${item.status == "completed" ? "line-through italic text-green-800" : ""}`}>{item.title}</p>
                                            <div className='text-gray-600 text-xl'>
                                                {item.discrption}
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className='bg-red-700 p-2 cursor-pointer text-3xl text-white rounded-lg'
                                    onClick={() => deleteTodo(item.id)}
                                >
                                    <MdDelete />

                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default TodoForm
