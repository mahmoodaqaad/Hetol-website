



import { CommentWithUser } from '@/utils/Types'
import { User } from '@prisma/client'
import React from 'react'
import SingleComment from './SingleComment'

const ShowAllcomment = ({ comments, user }: { comments: CommentWithUser[], user: User }) => {


  return (
    <div className=''>
      {comments.map((item, i) => (
        <SingleComment item={item} user={user} key={i} />
      ))
      }
    </div>
  )
}

export default ShowAllcomment
