import React from 'react'
import AddForm from './AddForm'

const AddRequest = () => {

    return (
        <section className='vh-dash flex justify-center items-center'  >
            <div className='p-4 shadow-md bg-gray-200 dark:bg-gray-700  rounded-md w-full sm:w-10/12 md:w-7/12 lg:w-5/12'>
                <h2 className='text-4xl text-center font-semibold'>Add Request</h2>
                <AddForm />
            </div>

        </section>
    )
}

export default AddRequest
