
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RestaurantPage = () => {
    const [reviews, setReviews] = useState([
        "Best restaurant experience ever! The food was amazing.",
        "Great atmosphere and delicious food. Definitely coming back!",
        "Absolutely loved the grilled chicken. Highly recommended!"
    ]);
    const [currentReview, setCurrentReview] = useState(0);

    useEffect(() => {
        AOS.init();
    }, []);

    const handlePrevReview = () => {
        setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    const handleNextReview = () => {
        setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="flex items-center justify-center bg-gradient-to-r from-green-600 to-green-400 p-16 text-white">
                <div className="w-1/2">
                    <h1 className="text-5xl font-extrabold mb-4 transform transition-all duration-500 hover:scale-105">
                        Welcome to Our Restaurant
                    </h1>
                    <p className="text-lg mb-6">
                        Discover a delightful dining experience with exquisite flavors and an elegant atmosphere.
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition duration-300 transform hover:scale-105">
                        Book a Table
                    </button>
                </div>
                <div className="w-1/2">
                    <Image
                        src="https://via.placeholder.com/600x400"
                        alt="Restaurant"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Menu Section */}
            <section className="py-16 bg-white text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Menu</h2>
                <div className="flex justify-center gap-8">
                    <div className="group relative rounded-lg shadow-lg overflow-hidden">
                        <Image
                            src="https://via.placeholder.com/400x300"
                            alt="Dish 1"
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover transform transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent w-full text-white group-hover:bg-black group-hover:bg-opacity-50 transition-all duration-300">
                            <h3 className="text-xl font-semibold">Grilled Chicken</h3>
                            <p className="text-sm">Delicious grilled chicken with a blend of spices.</p>
                            <p className="font-bold">$18</p>
                        </div>
                    </div>
                    <div className="group relative rounded-lg shadow-lg overflow-hidden">
                        <Image
                            src="https://via.placeholder.com/400x300"
                            alt="Dish 2"
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover transform transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent w-full text-white group-hover:bg-black group-hover:bg-opacity-50 transition-all duration-300">
                            <h3 className="text-xl font-semibold">Salmon Fillet</h3>
                            <p className="text-sm">Fresh salmon with a zesty lemon glaze.</p>
                            <p className="font-bold">$22</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="py-16 bg-gray-100 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Customer Reviews</h2>
                <div className="flex justify-center items-center mb-6">
                    <Image
                        src="/images/user-profile.jpg"
                        alt="User"
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                    />
                    <blockquote className="text-lg text-gray-700 italic">
                        {reviews[currentReview]}
                    </blockquote>
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
            </section>

            {/* Reservation Form Section */}
            <section className="py-16 bg-white text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Book a Table</h2>
                <form className="space-y-4 bg-gray-100 p-8 rounded-lg shadow-lg">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                        required
                    />
                    <input
                        type="time"
                        name="time"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                        required
                    />
                    <select
                        name="guests"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                        required
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1} Guest{i + 1 > 1 ? "s" : ""}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Book Now
                    </button>
                </form>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-100 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">How do I make a reservation?</h3>
                        <p className="text-gray-600">You can easily make a reservation by filling out the form above.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Do you accept walk-ins?</h3>
                        <p className="text-gray-600">Yes, we accept walk-ins, but it's better to book a table to guarantee availability.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RestaurantPage;
