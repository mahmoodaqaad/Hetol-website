"use client"

import React, { useState } from 'react'

const BookForm = () => {
    const [form, setForm] = useState({
        name: "",
        date: "",
        time: "",
        guests: 1,
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Your reservation has been submitted!");
        setForm({ name: "", date: "", time: "", guests: 1 });
    };
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Reserve a Table</h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-8 rounded-lg shadow-lg">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
                <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
                <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
        </div>
    )
}

export default BookForm
