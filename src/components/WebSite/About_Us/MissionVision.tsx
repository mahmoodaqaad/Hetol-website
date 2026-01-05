import React from 'react';

const MissionVision = () => {
    return (
        <section className="bg-gray-100 dark:bg-gray-800 py-12 px-6 md:px-16">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
                <div>
                    <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-gray-700 dark:text-gray-300">To create unforgettable stays with top-quality services, outstanding comfort, and a welcoming atmosphere.</p>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-gray-700 dark:text-gray-300">To be the leading choice for hospitality, known for excellence, trust, and innovation in the hotel industry.</p>
                </div>
            </div>
        </section>
    );
};

export default MissionVision;
