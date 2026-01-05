import React from 'react'
import Form from './Form'

const ConectForm = () => {
    return (
        <div className='vh-100 flex  justify-center items-center mt-20 md:m-0 p-2'>
            <div className='w-full md:w-3/4 lg:w-1/2 bg-gray-200 dark:bg-gray-700  dark:text-white rounded-md p-4 text-center'>
                <h1 className='text-center text-3xl md:text-4xl font-semibold' >Contact Us</h1>
                <Form />
            </div>
        </div>
    )
}

export default ConectForm
