import Image from 'next/image'
import React from 'react'

const Day_Dish = () => {
    return (
        <div className="bg-yellow-100 dark:bg-yellow-600 p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dish of the Day</h2>
            <div className="flex items-center flex-wrap ">
                <div className='w-full md:w-1/3 p-3'>

                    <Image src="/images/Salmon.png" alt="Dish of the Day" width={400} height={300} className="rounded-xl object-cover" />
                </div>
                <div className="w-full md:w-2/3 p-3">
                    <h3 className="text-3xl md:text-5xl font-bold text-gray-800">Special Grilled Salmon</h3>
                    <p className="text-lg md:text-2xl text-gray-600 mb-4 mt-4">A delicious grilled salmon fillet served with lemon and fresh herbs.</p>
                    <p className="font-semibold text-gray-800 md:text-xl">$22</p>
                </div>
            </div>
        </div>

    )
}

export default Day_Dish
