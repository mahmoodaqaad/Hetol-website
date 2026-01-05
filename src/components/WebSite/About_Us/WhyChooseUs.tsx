import React from 'react';

const WhyChooseUs = () => {
    const points = [
        "Prime location in the heart of the city",
        "24/7 customer support",
        "Luxury rooms with modern amenities",
        "Affordable pricing for all budgets",
        "Free breakfast and Wi-Fi"
    ];

    return (
        <section className="bg-gray-50 dark:bg-gray-800 py-12 px-6 md:px-16">
            <h3 className="text-3xl font-bold text-center mb-8">Why Choose Us</h3>
            <div className="max-w-4xl mx-auto grid gap-4">
                {points.map((point, i) => (
                    <div key={i} className="bg-white dark:bg-gray-700  p-4 rounded shadow text-gray-800 dark:text-white">{point}</div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
