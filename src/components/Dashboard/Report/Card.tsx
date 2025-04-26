import Link from 'next/link'
import { IconType } from 'react-icons'


const Card = ({ link, length, title, color, Icon }: {
    link: string
    length: number
    title: string
    color: string
    Icon: IconType
}) => {
    return (

        <Link href={`/dashboard/${link}`} className='w-full md:w-1/2 lg:w-3/12 p-2'>
            <div className={`py-6 px-6 shadow-lg rounded-lg border-2 hover:-translate-y-4 transition-transform duration-300 border-${color}-300`}>
                <div className='flex items-center gap-2 justify-between'>
                    <div className='text-6xl '>
                        <Icon className={`text-${color}-500`} />
                    </div>
                    <div className='text-center'>
                        <p className='text-2xl font-medium'>Total {title}</p>
                        <h2 className={`font-semibold text-4xl text-${color}-500`}>{length}</h2>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default Card
