import Link from 'next/link'
import React from 'react'

interface room {
    name: string,
    guest?: string,
    view?: string,
    id: number

}

const Search = ({ result }: { result: room[] }) => {


    return (

        result.length > 0 &&
        <div className='w-full md:w-2/5 border-2 mt-2 absolute z-20 max-h-[420px] overflow-y-auto shadow-lg scroll-m-8'>
            {
                result?.map((item, i) => (
                    <Link href={`/rooms/${item.id}`}

                        key={i} className='block border-2 px-3 py-1 bg-white text-left hover:bg-gray-200 transition-all '>
                        <h1 className='text-2xl font-semibold'>

                            {item.name}
                        </h1>

                        <div className='mt-2 text-blue-500 text-xl'>
                            {item.guest &&
                                <div>
                                    guest:
                                    <span className='font-semibold'>

                                        {item.guest} Person
                                    </span>
                                </div>
                            }
                            {item.view &&
                                <div>
                                    view:
                                    <span className='font-semibold'>
                                        {item.view}
                                    </span>
                                </div>
                            }

                        </div>
                    </Link>

                ))
            }
        </div>

    )
}

export default Search
