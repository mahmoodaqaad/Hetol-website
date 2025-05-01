"use client"

import { Todo } from '@prisma/client'
import SingleTodo from './SingleTodo'
import Form from './Form'
import { useState } from 'react'

const TodoForm = ({ userId, todo }: { userId: number, todo: Todo[] }) => {

    const [todos, setTodos] = useState(todo)



    return (
        <div>
            <Form userId={userId} setTodos={setTodos} />

            <div className='mt-5'>
                <div className='border-t-2 border-gray-500'>

                    {


                        todos.map((item, i) => (
                            <SingleTodo setTodos={setTodos} todo={item} key={i} />
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default TodoForm
