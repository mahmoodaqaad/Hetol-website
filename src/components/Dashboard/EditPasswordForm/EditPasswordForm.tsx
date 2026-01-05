"use client"

import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import Form from './Form'

const EditPasswordForm = ({ showBotton = true }: { showBotton: boolean }) => {

    const [showMore, setShowMore] = useState(false)
    return (
        <div className='shadow-lg bg-gray-200 dark:bg-gray-900 p-6 mt-4'>
            {showBotton &&
                <button className='bg-red-500 text-white px-4 py-1 text-2xl rounded mt-5'
                    onClick={() => {
                        setShowMore(!showMore)
                    }}
                >
                    Edit Password
                </button>
            }
            {
                (showMore || !showBotton )&&
                <div className='shadow bg-gray-100 dark:bg-gray-800 mt-4 p-5 transition-all'>
                    {showBotton &&
                        <div className='flex justify-end '>

                            <div className='p-1 bg-red-500 w-fit text-white text-xl rounded mb-4 cursor-pointer'
                                onClick={() => setShowMore(false)}
                            >

                                <CgClose className='' />
                            </div>
                        </div>
                    }

                    <Form setShowMore={setShowMore} />
                </div>


            }
        </div>
    )
}

export default EditPasswordForm
