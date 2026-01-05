import React from 'react'

const Form = () => {
    return (
        <>
            <div className='flex flex-wrap items-center mt-2'>

                <div className='w-full md:w-1/2 p-1 md:p-2'>
                    <input required type="text" className='py-3 px-2 rounded-lg w-full dark:bg-gray-800' placeholder='Your Name' />
                </div>
                <div className='w-full md:w-1/2 p-1 md:p-2'>
                    <input required type="email" className='py-3 px-2 rounded-lg w-full dark:bg-gray-800' placeholder='Your Email' />
                </div>
                <div className='w-full md:w-1/2 p-1 md:p-2'>
                    <input type="number" className='py-3 px-2 rounded-lg w-full dark:bg-gray-800' placeholder='Your Phone' />
                </div>
                <div className='w-full md:w-1/2 p-1 md:p-2'>
                    <input required type="text" className='py-3 px-2 rounded-lg w-full dark:bg-gray-800' placeholder='Your Subject' />
                </div>
                <div className='w-full p-2'>
                    <textarea placeholder='Your Message' className='p-2 rounded-lg w-full resize-none  dark:bg-gray-800' rows={9}></textarea>
                </div>
            </div>

            <button className='bg-gradient-to-r from-sky-700 via-sky-500 to-sky-300 text-center text-2xl font-semibold text-white  py-2 px-8 rounded-md hover:scale-110 transition-transform'>
                Sent

            </button>
        </>
    )
}

export default Form
