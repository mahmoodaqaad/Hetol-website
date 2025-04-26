import EditPasswordForm from '@/components/Dashboard/EditPasswordForm/EditPasswordForm'
import React from 'react'

const page = () => {
    return (
        <div className='pt-[104px]'>

            <div className='text-3xl font-mono mb-2'>
                Change Password
            </div>
            <div className='w-full md:w-3/4 lg:w-1/2'>

                <EditPasswordForm showBotton={false} />
            </div>
        </div>
    )
}

export default page
