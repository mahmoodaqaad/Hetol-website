import React from 'react'
import "./hero.css"
const Hero = () => {
    return (
        <section>
            <div className=" hero ">
                <div className='flex items-center justify-between mb-12 vh-100 bg-gray-900 bg-opacity-50 pt-[86px] md:pt-[104px]'>

                    <div className="w-full md:w-1/2 ml-auto p-1 text-center md:text-left md:p-7  ">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
                            Welcome to Our Restaurant
                        </h1>
                        <p className="text-xl md:text-4xl text-white mb-6">
                            Discover a delightful dining experience with exquisite flavors and
                            an elegant atmosphere.
                        </p>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition duration-300">
                            Book a Table
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero
