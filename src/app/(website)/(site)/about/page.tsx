import AboutDescription from '@/components/WebSite/About_Us/AboutDescription'
import AboutHero from '@/components/WebSite/About_Us/AboutHero'
import CoreValues from '@/components/WebSite/About_Us/CoreValues'
import CustomerTestimonials from '@/components/WebSite/About_Us/CustomerTestimonials'
import MeetTheTeam from '@/components/WebSite/About_Us/MeetTheTeam'
import MissionVision from '@/components/WebSite/About_Us/MissionVision'
import WhyChooseUs from '@/components/WebSite/About_Us/WhyChooseUs'
import React from 'react'

const page = () => {
    return (
        <div className='dark:bg-gray-700 dark:text-white'>
            <div>
                <AboutHero />
            </div>
            <div>
                <AboutDescription />
            </div>
            <div>
                <MissionVision />
            </div>
            <div>
                <CoreValues />
            </div>
            <div>
                <WhyChooseUs />
            </div>
            <div>
                <MeetTheTeam />
            </div>
            <div>
                <CustomerTestimonials />
            </div>
        </div>
    )
}

export default page
