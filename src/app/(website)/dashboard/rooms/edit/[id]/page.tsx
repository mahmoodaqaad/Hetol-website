import React from 'react'
import { Room } from '@prisma/client'
import { getSingleRoom } from '@/apiCall/Rooms'
import EditForm from './EditForm'
import AuthGuardPage from '@/components/Auth/AuthGuard/AuthGuard'
interface EditFormProps {
    params: { id: string }
}
const EditRoom = async ({ params: { id } }: EditFormProps) => {
    const Room: Room = await getSingleRoom(id)

    return (
        <AuthGuardPage allowedRole={["SuperAdmin", "Admin"]}>

            <section className='vh-dash flex justify-center items-center'  >
                <div className='p-4 shadow-md bg-gray-200 dark:bg-gray-700  rounded-md w-full sm:w-10/12 md:w-7/12 lg:w-5/12'>
                    <h2 className='text-4xl text-center font-semibold'>Edit Room</h2>
                    <EditForm room={Room} />
                </div>
            </section>
        </AuthGuardPage>

    )
}

export default EditRoom
