import EditForm from '@/app/(website)/dashboard/users/edit/[id]/EditForm'
import { varfiyMyAccount } from '@/utils/verfiyToken'
import { User } from '@prisma/client'
import React from 'react'

const page = async () => {
    const user = await varfiyMyAccount() as User

    return (
        <div className='pt-[86px] lg:pt-[104px] '>

            <div className='p-3 bg-gray-100 dark:bg-gray-800  w-full md:w-3/4 lg:w-1/2 rounded-lg'>

                <div className='text-3xl font-mono mb-2'>
                    Edit Your info
                </div>
                <EditForm user={user} ShowRole={false} redirect={false} />
            </div>
        </div>
    )
}

export default page
