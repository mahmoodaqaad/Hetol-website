import EditPasswordForm from '@/components/Dashboard/EditPasswordForm/EditPasswordForm'
import { User } from '@prisma/client'
import React from 'react'

const EditPassword = ({ user }: { user: User }) => {
    return (
        <div>
            <h2 className='text-4xl font-semibold'>Edit Your Password</h2>

            <EditPasswordForm user={user} />
        </div>
    )
}

export default EditPassword
