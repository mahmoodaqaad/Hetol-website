import { getRoomsCount } from '@/apiCall/Rooms'
import Rooms from '@/components/WebSite/Rooms/Rooms'
import React from 'react'


const RoomsPage = async () => {
    const count = await getRoomsCount()
    return (
        <div className='pt-[86px] lg:pt-[104px] '>

            <Rooms count={count} />
        </div>
    )
}

export default RoomsPage
