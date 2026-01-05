// components/About/AboutDescription.tsx
import React from 'react';

const AboutDescription = () => {
    return (
        <section className="py-12 px-6 md:px-16 ">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-50">Who We Are</h2>
                <p className="text-gray-600 dark:text-gray-200 text-lg leading-relaxed ">
                    Our hotel is more than just a place to stay – it{"'"}s a luxurious escape designed for comfort, relaxation, and memorable experiences.
                    Since opening our doors, we’ve been committed to delivering top-tier hospitality, a peaceful atmosphere, and personalized services
                    to all our guests. Whether you{"'"}re traveling for business, leisure, or a special occasion, we offer the perfect balance between elegance and convenience.
                </p>
            </div>
        </section>
    );
};

export default AboutDescription;
