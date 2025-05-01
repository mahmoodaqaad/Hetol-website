import CreateComment from '@/components/WebSite/SinglePage/Comments/CreateComment'
import Rating from '@/components/WebSite/SinglePage/Comments/Rating/Rating'
import ShowAllcomment from '@/components/WebSite/SinglePage/Comments/ShowAllcomment'
import { CommentWithUser, RoomWithReltionAll } from '@/utils/Types'
import { User } from '@prisma/client'
import React from 'react'

const CommentAndReting = async ({ room, user }: { room: RoomWithReltionAll, user: User }) => {

    return (
        <div>

            <div className='pt-3 mt-3 border-t-2 border-yellow-400 w-full sm:w-3/4 md:w-3/5 lg:w-1/3 '>
                {

                    !room.Rating.some(item => item.userId === user.id) ?

                        < Rating room={room} user={user} />


                        :
                        <div className='italic text-3xl p-3 text-center mb-3 text-yellow-300'>Thank You For Rating</div>
                }

                <CreateComment roomId={room.id} userId={Number(user?.id)} />

                <ShowAllcomment comments={room.comments as CommentWithUser[]} user={user} />
            </div>
        </div>
    )
}

export default CommentAndReting
