"use client"
import React, { useState } from 'react'

const Reviews = () => {
    const [currentReview, setCurrentReview] = useState(0);

    const reviews = [
        "Amazing food and very friendly staff. We loved the atmosphere!",
        "The best steak I’ve had in years. Highly recommend the chocolate dessert!",
        "A fantastic experience, will definitely come back again.",
        "Perfect place for a family dinner, with great service and food!",
    ];

    const handleNextReview = () => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
    };

    const handlePrevReview = () => {
        setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white  mb-6">Customer Reviews</h2>
            <div className="text-lg text-gray-700 dark:text-gray-200 italic mb-6">
                <blockquote>{reviews[currentReview]}</blockquote>
            </div>
            <div className="flex justify-between items-center">
                <button
                    className="text-green-600 hover:text-green-800"
                    onClick={handlePrevReview}
                >
                    Previous
                </button>
                <button
                    className="text-green-600 hover:text-green-800"
                    onClick={handleNextReview}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Reviews
