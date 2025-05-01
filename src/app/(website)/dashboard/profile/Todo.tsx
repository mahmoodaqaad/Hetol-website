
import { varfiyTokenForPage } from '@/utils/verfiyToken'
import React from 'react'
import { Todo } from '@prisma/client'
import TodoForm from '@/components/Dashboard/Profile/TodoForm'
import { getMyTodo } from '@/apiCall/todo'
const TodoPage = async () => {
  const user = await varfiyTokenForPage()
  const todo: Todo[] = await getMyTodo(Number(user?.id))



  return (
    <div className=''>
      <h2 className='text-4xl font-semibold'>My Todo</h2>

      <div className='bg-gray-100 dark:bg-gray-800 p-6 mt-4'>
        <TodoForm userId={Number(user?.id)} todo={todo} />
      </div>


    </div>

  )
}

export default TodoPage
