import React from 'react'
import LoginForm from './LoginForm'
import Header from '@/components/WebSite/header/Header'

const page = () => {


    return (
        <>
            <Header />

            <div className='flex items-center justify-center vh-100'>
                <div className="text-center bg-gray-100 shadow-xl rounded-lg p-5 w-11/12 sm:w-9/12 md:w-6/12 lg:w-4/12 ">


                    <h1 className='text-3xl  font-semibold text-gray-600 uppercase'>Login</h1>

                    <LoginForm />
                </div>

            </div>
        </>
    )
}

export default page
