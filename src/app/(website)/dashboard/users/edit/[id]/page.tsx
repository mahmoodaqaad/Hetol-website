import React from 'react'
import EditForm from './EditForm'
import { User } from '@prisma/client'
import { getSingleUser } from '@/apiCall/users'
import AuthGuardPage from '@/components/Auth/AuthGuard/AuthGuard'
interface EditFormProps {
    params: { id: string }
}
const page = async ({ params: { id } }: EditFormProps) => {
    const user: User = await getSingleUser(id)

    return (
        <AuthGuardPage allowedRole={["SuperAdmin", "Admin", "Manager"]}>

            <section className='vh-dash flex justify-center items-center'  >
                <div className='p-4 shadow-md bg-gray-200 dark:bg-gray-700  rounded-md w-full sm:w-10/12 md:w-7/12 lg:w-5/12'>
                    <h2 className='text-4xl text-center font-semibold'> Edit user</h2>
                    <EditForm user={user} />
                </div>

            </section>
        </AuthGuardPage>
    )
}

export default page