import React from 'react';

const CoreValues = () => {
    const values = [
        "Hospitality",
        "Integrity",
        "Excellence",
        "Respect",
        "Innovation"
    ];

    return (
        <section className="py-12 px-6 md:px-16 bg-white text-center dark:bg-gray-700">
            <h3 className="text-3xl font-bold mb-6">Our Core Values</h3>
            <ul className="flex flex-wrap justify-center gap-6 text-gray-700  dark:text-gray-300 text-lg">
                {values.map((value, i) => (
                    <li key={i} className="bg-gray-100 dark:bg-gray-900 px-6 py-4 rounded shadow">{value}</li>
                ))}
            </ul>
        </section>
    );
};

export default CoreValues;
