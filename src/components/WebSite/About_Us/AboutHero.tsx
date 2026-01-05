// components/About/AboutHero.tsx
import React from 'react';

const AboutHero = () => {
    return (
        <section className="relative  vh-100 w-full bg-cover bg-center" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')`
        }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-4">
                    <h1 className="text-4xl md:text-8xl font-bold mb-4">About Our Hotel</h1>
                    <p className="text-lg md:text-3xl">Where comfort meets elegance and every guest feels at home.</p>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
