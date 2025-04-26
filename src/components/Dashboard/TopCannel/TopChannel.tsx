import React from 'react'
import google from '@/IMG/google.png'
import gutHub from '@/IMG/github.png'
import facebook from '@/IMG/Facebook2.jpg'
import Vimeo from '@/IMG/Vimeo.png'
import twiter from '@/IMG/twiter.png'
import Image from 'next/image'
import "./TopChannel.css"
const TopChannel = () => {

    const data = [
        { id: 1, name: "Google", img: google, visits: "3.5K", revenue: "$5,768", conversions: 590, rate: "4.8%" },
        { id: 2, name: "GitHub", img: gutHub, visits: "3.5K", revenue: "$6,768", conversions: 390, rate: "4.2%" },
        { id: 3, name: "Facebook", img: facebook, visits: "2.2K", revenue: "$4,635", conversions: 467, rate: "4.3%" },
        { id: 4, name: "Vimeo", img: Vimeo, visits: "2.1K", revenue: "$4,290", conversions: 420, rate: "3.7%" },
        { id: 5, name: "Twitter", img: twiter, visits: "3.5K", revenue: "$3,580", conversions: 389, rate: "2.5%" }
    ];

    return (
        <div className={` rounded px-4 overflow-auto `}>
            <h3 className='pt-3 text-3xl font-semibold'>Top Channel</h3>
            <table className='w-full mt-4 rounded topchannel'>
                <thead style={{ background: "rgb(49 61 74) " }}>
                    <tr>
                        <td className='py-3 border-2 px-1' style={{ color: "white" }}>Source</td>
                        <td className='py-3 border-2 px-1' style={{ color: "white" }}>Visitors</td>
                        <td className='py-3 border-2 px-1' style={{ color: "white" }}>Revenues</td>
                        <td className='py-3 border-2 px-1' style={{ color: "white" }}>Sales</td>
                        <td className='py-3 border-2 px-1' style={{ color: "white" }}>Conversion</td>
                    </tr>
                </thead>
                <tbody>

                    {
                        data.map(({ id, name, img, visits, revenue, conversions, rate }) => (
                            <tr className='py-4' key={id}>
                                <td className='py-4  px-2  '>
                                    <div className=' flex gap-x-4 items-center flex-wrap justify-center md:justify-start '>

                                        <Image width={50} src={img} className='img-rounded me-3' alt="" />
                                        {name}
                                    </div>
                                </td>
                                <td className='py-4 px-2'> {visits}</td>
                                <td className='py-4 px-2 text-success-alt'>{revenue}</td>
                                <td className='py-4 px-2 '>{conversions}</td>
                                <td className='py-4 px-2 text-filed-alt'>{rate}</td>
                            </tr>

                        ))
                    }


                </tbody>
            </table>
        </div>
    )
}

export default TopChannel




