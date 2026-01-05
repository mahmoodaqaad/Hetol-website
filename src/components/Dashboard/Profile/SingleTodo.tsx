"use client"


import { LoadingBtn } from '@/app/loading'
import { ModeContext } from '@/Context/ModeContext'
import { DOMAIN } from '@/utils/consant'
import { Todo } from '@prisma/client'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

interface SingleTodoProps {
  todo: Todo
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const SingleTodo = ({ todo, setTodos }: SingleTodoProps) => {

  const [loading, setLoading] = useState(false)
  const context = useContext(ModeContext)
  if (!context) {
    throw new Error("Error in mode context")
  }
  const { isDarkmode } = context


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

          setLoading(true)
          await axios.delete(`${DOMAIN}/api/todo/myTodo/${id}`)
          setTodos(prev => prev.filter(item => item.id !== id))

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            background: !isDarkmode ? "#444" : "#fff",
            color: isDarkmode ? "#333" : "#fff",
          });




          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(error);

          toast.error(error.response?.data?.message)
        }
        finally {
          setLoading(false)
        }
      }
    })
  }


  return (
    <div
      key={todo.id}
      className='flex items-start gap-2 p-3 border select-none flex-col md:flex-row'
    >
      <div className='flex gap-1  items-center w-full'>

        <input type="checkbox" width={30} checked={todo.status == "completed"}
          onChange={() => handleToggleStatus(todo.id)}
          id={"title" + todo?.id}
        />
        <div className='w-full'>

          <label htmlFor={"title" + todo?.id} className='w-full block cursor-pointer'>

            <p className={`text-xl md:text-2xl ${todo.status == "completed" ? "line-through italic text-green-800" : ""}`}>{todo.title}</p>
            <div className='text-gray-600 dark:text-gray-400  md:text-xl'>
              {todo.discrption}
            </div>
          </label>
        </div>
      </div>

      <button className='bg-red-700 p-2 cursor-pointer text-3xl text-white rounded-lg mx-auto'
        onClick={() => deleteTodo(todo.id)}
        disabled={loading}
      >
        {
          loading ?
            <LoadingBtn />
            :
            <MdDelete />
        }

      </button>

    </div>
  )
}

export default SingleTodo
