"use "
import Link from 'next/link'
import Bar from './Bar'
import NavBar from './NavBar'
import { varfiyMyAccount } from '@/utils/verfiyToken'
import Logout from '../Logout/Logout'
import { FaUserCircle } from 'react-icons/fa'
import { IsSuperAdminOrAdminOrManagerPage } from '@/utils/CheckRole'

const Header = async () => {
    const user = await varfiyMyAccount()
    return (
        <div className={`bg-teal-800 opacity-80 transition-all fixed z-30 top-0 left-0 w-full px-5 py-6  hover:opacity-100`}>
            <div className="flex items-center justify-between text-white relative">
                <Link href={"/"} className="logo">
                    <h1 className='text-2xl font-semibold tracking-widest font-mono'>
                        Harbor<span className='text-yellow-200'>lights</span>
                    </h1>
                </Link>
                <div className='flex items-center'>
                    <NavBar user={user} />
                    <div className='flex items-center gap-4'>

                        <div className='flex items-center justify-center gap-3'>
                            {
                                user ?
                                    <>
                                        <Link className='  text-2xl' href={
                                            user.role === "User" ?
                                                "/profile"
                                                : "/dashboard/profile"
                                        }>
                                            <FaUserCircle className='text-4xl mr-2 hover:opacity-65 hover:scale-105 transition-all' />
                                        </Link>
                                        {
                                            IsSuperAdminOrAdminOrManagerPage(user?.role) &&
                                            <Link className='bg-sky-500 hidden md:block text-white px-3 py-2' href={"/dashboard"}>dashboard</Link>
                                        }
                                        <div className='hidden md:block'>

                                            <Logout />
                                        </div>
                                    </>


                                    : <>
                                        <Link className='bg-teal-700 px-4 py-2 rounded-md hover:bg-gray-900' href={"/login"}>Login</Link>
                                        <Link className='bg-cyan-700 px-2 py-2 rounded-md hover:bg-gray-900' href={"/register"}>Register</Link>
                                    </>
                            }
                        </div>
                        <Bar />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Header
