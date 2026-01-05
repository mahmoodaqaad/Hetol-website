"use client"
import { LoadingBtn } from '@/app/loading'
import { socket } from '@/lib/socketClints'
import { DOMAIN } from '@/utils/consant'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const CreateComment = ({ roomId, userId }: { roomId: number, userId: number }) => {

  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const createComment = async (e: React.FormEvent) => {

    e.preventDefault()
    try {
      if (!userId) {
        toast.error("You Are Not log in ,must be log in")
        router.replace("/login")
      }
      else {

        if (!text) return toast.error("write something")
        setLoading(true)
        const res = await axios.post(`${DOMAIN}/api/comments`, { roomId, userId, text })

        const notf = res?.data?.notf;
        const link = "rooms/" + res?.data?.notf.roomId;
        const data = { ...notf.newNofticetion, link }

        socket.emit("createComment", data)



        // socket.emit("createComment", {})
        router.refresh()
        toast.success("Add your comment successfully")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message)

    } finally {

      setLoading(false)
    }
  }

  return (
    <div>
      <form >
        <div className='flex items-center gap-3 w-full'>

          <div className='flex-1'>
            <input placeholder='Add your comment' type="text" className=' dark:bg-gray-600 dark:text-white px-2 py-2 rounded outline-none border-none text-xl w-full'
              onFocus={() => {
                if (!userId)
                  toast.error("you are not Login")
              }}
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>
          <div>
            <button onClick={createComment} disabled={loading} className='text-xl px-3 py-2 bg-blue-400 text-white rounded disabled:cursor-wait disabled:bg-blue-300'>
              {

                loading ?
                  <LoadingBtn /> :

                  "Add"

              }
            </button>
          </div>
        </div>
      </form>
    </div >
  )
}

export default CreateComment
