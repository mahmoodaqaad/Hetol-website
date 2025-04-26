import { varfiyMyAccount } from '@/utils/verfiyToken'
import { User } from '@prisma/client'
import React from 'react'

const page = async () => {

    const user: User = await varfiyMyAccount()
    console.log(user);

    return (
        <div className='pt-[104px]'>
            <div className='text-2xl '>
                <div className='text-3xl font-mono mb-2'>
                    Profile
                </div>
                <table className='text-xl p-3 '>
                    <tr>
                        <td className='w-32 font-semibold text-xl'>
                            Name :

                        </td>
                        <td className='text-2xl'>
                            {user.name}
                        </td>
                    </tr>
                    <tr>
                        <td className='w-32 font-semibold text-xl'>
                            Role :

                        </td>
                        <td className='text-2xl'>
                            {user.role}
                        </td>
                    </tr>
                    <tr>
                        <td className='w-32 font-semibold text-xl'>
                            Create At :

                        </td>
                        <td className='text-2xl'>
                            {new Date(user.createdAt).toDateString()}
                        </td>
                    </tr>

                </table>
            </div>

        </div>
    )
}

export default page
