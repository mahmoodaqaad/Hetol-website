import { FaRegStar, FaStar } from 'react-icons/fa';
import React from 'react'

const Rating = ({ ava }: { ava: number }) => {
    const rating = Math.round(ava)

    const showGoldStars = Array.from({ length: rating }).map((_, index) => <FaStar key={index} color='#FFD700' />)
    const showEmptyStars = Array.from({ length: 5 - rating }).map((_, index) => <FaRegStar key={index} />)

    return (

            <div className='flex gap-3 text-2xl items-center'>
                {showGoldStars}
                {showEmptyStars}


                ({ava})
            </div>
    )
}

export default Rating
