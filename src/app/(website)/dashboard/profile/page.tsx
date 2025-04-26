import { varfiyMyAccount, } from '@/utils/verfiyToken'
import { User } from '@prisma/client'
import React from 'react'
import TodoPage from './Todo';
import EditPassword from './EditPassword';

const page = async () => {

    const user = await varfiyMyAccount() as User;


    return (
        <section className=''>
            <div>

                <div>
                    <div className='flex items-center gap-3 mb-3 border p-4 rounded-lg'>
                        <p className='text-2xl '>Hello:</p>
                        <p className='text-3xl font-semibold'>
                            {user.name}
                        </p>
                    </div>
                    <div className='flex items-center gap-3 mb-3 border p-4 rounded-lg'>
                        <p className='text-2xl '>
                            Your Email is :
                        </p>

                        <p className='text-3xl font-semibold'>
                            {user.email}
                        </p>
                    </div>
                    <div className='flex items-center gap-3 mb-3 border p-4 rounded-lg'>
                        <p className='text-2xl '>
                            Your Role is :
                        </p>
                        <p className='text-3xl font-semibold'>
                            {user.role}
                        </p>
                    </div>
                    <div className='flex items-center gap-3 mb-3 border p-4 rounded-lg'>
                        <p className='text-2xl '>
                            Your Create Your Account in
                        </p>
                        <p className='text-3xl font-semibold'>
                            {new Date(user.createdAt).toDateString()}
                        </p>
                    </div>
                </div>

            </div>

            <div className='flex flex-wrap  '>
                <div className='p-5 w-full lg:w-1/2'>

                    <TodoPage />
                </div>
                <div className='p-5 w-full lg:w-1/2'>

                    <EditPassword user={user} />
                </div>


            </div>
        </section>
    )
}

export default page
