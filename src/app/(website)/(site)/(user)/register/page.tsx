import React from 'react'
import RegisterForm from './RegisterForm'
import Header from '@/components/WebSite/header/Header'

const page = () => {


  return (
    <>
      <Header />
      <div className='flex items-center justify-center vh-100'>
        <div className="text-center bg-gray-100 dark:bg-gray-700 shadow-xl rounded-lg p-5 w-11/12 sm:w-9/12 md:w-6/12 lg:w-4/12 ">


          <h1 className='text-3xl  font-semibold text-gray-600  dark:text-gray-100 uppercase'>Register</h1>

          <RegisterForm />
        </div>

      </div>
    </>
  )
}

export default page
