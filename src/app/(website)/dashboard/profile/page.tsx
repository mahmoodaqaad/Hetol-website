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

                <table className='text-xl p-3 w-full'>
                    <tr className='block w-full mb-3 border px-1 py-3 rounded-lg'>
                        <td className='w-32 font-semibold text-xl'>
                            Name :

                        </td>
                        <td className='text-2xl'>
                            {user.name}
                        </td>
                    </tr>
                    <tr className='block w-full mb-3 border px-1 py-3 rounded-lg'>
                        <td className='w-32 font-semibold text-xl'>
                            Role :

                        </td>
                        <td className='text-2xl'>
                            {user.role}
                        </td>
                    </tr>
                    <tr className='block w-full mb-3 border px-1 py-3 rounded-lg'>
                        <td className='w-32 font-semibold text-xl'>
                            Create At :

                        </td>
                        <td className='text-2xl'>
                            {new Date(user.createdAt).toDateString()}
                        </td>
                    </tr>

                </table>

            </div>

            <div className='flex flex-wrap '>
                <div className=' w-full lg:w-1/2 p-1 md:p-3'>

                    <TodoPage />
                </div>
                <div className=' w-full lg:w-1/2 p-1 md:p-3'>

                    <EditPassword />
                </div>


            </div>
        </section>
    )
}

export default page
