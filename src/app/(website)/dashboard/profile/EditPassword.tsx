import EditPasswordForm from '@/components/Dashboard/EditPasswordForm/EditPasswordForm'
import React from 'react'

const EditPassword = () => {
    return (
        <div>
            <h2 className='text-4xl font-semibold'>Edit Your Password</h2>

            <EditPasswordForm showBotton={true} />
        </div>
    )
}

export default EditPassword
