import Link from 'next/link'
import Bar from './Bar'
import NavBar from './NavBar'
import { varfiyMyAccount } from '@/utils/verfiyToken'
import { FaUserCircle } from 'react-icons/fa'
import { IsSuperAdminOrAdminOrManagerPage } from '@/utils/CheckRole'
import ThemeMode from '@/components/Dashboard/NavBarDashboard/ThemeMode'
import Logout from '@/components/Auth/Logout/Logout'
import { User } from '@prisma/client'
import NotifictionPage from '@/components/Notifiction/NotifictionPage'
import { socket } from '@/lib/socketClints'

const Header = async () => {
    const user: User & { Notification: Notification[] } = await varfiyMyAccount()

    setTimeout(() => {

        socket.emit("addNewUser", user)
    }, 1500);



    return (
        <div className={`bg-teal-800  transition-all fixed z-30 top-0 left-0 w-full px-5 py-6  hover:opacity-100`}>
            <div className="flex items-center justify-between text-white  relative">
                <Link href={"/"} className="logo">
                    <h1 className='text-2xl font-semibold tracking-widest font-mono'>
                        Harbor<span className='text-yellow-200'>lights</span>
                    </h1>
                </Link>
                <div className='flex items-center'>
                    <NavBar user={user} />
                    <div className='flex items-center gap-4'>
{user?.email}
                        <ThemeMode />
                        {
                            user &&
                            <NotifictionPage user={user} />
                        }

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


                                    : <div className='hidden md:flex gap-3'>
                                        <Link className='bg-teal-700 px-4 py-2 rounded-md hover:bg-gray-900' href={"/login"}>Login</Link>
                                        <Link className='bg-cyan-700 px-2 py-2 rounded-md hover:bg-gray-900' href={"/register"}>Register</Link>
                                    </div>
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
