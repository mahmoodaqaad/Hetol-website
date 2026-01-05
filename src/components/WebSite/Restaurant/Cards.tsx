import Image from 'next/image'
import React from 'react'

const Cards = () => {
    const data = [
        {
            id: 1,
            title: 'Grilled Chicken',
            description: 'Delicious grilled chicken with a blend of spices.',
            price: '$18',
            imgSrc: '/images/Grilled-Chicken.jpg',
            alt: 'Dish 1',
        },
        {
            id: 2,
            title: 'Caesar Salad',
            description: 'Crisp lettuce with creamy dressing and croutons.',
            price: '$10',
            imgSrc: '/images/Caesar-salad_-4.jpg',
            alt: 'Dish 2',
        },
        {
            id: 3,
            title: 'Spaghetti Carbonara',
            description: 'Classic pasta with creamy sauce and pancetta.',
            price: '$15',
            imgSrc: '/images/spaghetti-carbonara-1200.jpg',
            alt: 'Dish 3',
        },
        {
            id: 4,
            title: 'Grilled Salmon',
            description: 'Fresh salmon grilled to perfection with a lemon glaze.',
            price: '$22',
            imgSrc: '/images/Salmon.png',
            alt: 'Dish 4',
        },
        {
            id: 5,
            title: 'Vegetarian Burger',
            description: 'A delicious plant-based burger with all the fixings.',
            price: '$12',
            imgSrc: '/images/Vegetarian-Burger.jpg',
            alt: 'Dish 5',
        },
        {
            id: 6,
            title: 'Sushi Rolls',
            description: 'Fresh sushi rolls with a variety of fillings.',
            price: '$16',
            imgSrc: '/images/Sushi-Rolls.jpg',
            alt: 'Dish 6',
        },
        // البطاقات الإضافية
        {
            id: 7,
            title: 'Chicken Tacos',
            description: 'Soft tortillas filled with seasoned chicken and fresh veggies.',
            price: '$14',
            imgSrc: '/images/Chicken-Tacos.jpg',
            alt: 'Dish 7',
        },
        {
            id: 8,
            title: 'Beef Stew',
            description: 'Tender beef stew with vegetables and a rich broth.',
            price: '$20',
            imgSrc: '/images/Beef-Stew.jpg',
            alt: 'Dish 8',
        },
        {
            id: 9,
            title: 'Veggie Stir Fry',
            description: 'A healthy stir fry with mixed vegetables and soy sauce.',
            price: '$13',
            imgSrc: '/images/Veggie-Stir-Fry.jpg',
            alt: 'Dish 9',
        },
        {
            id: 10,
            title: 'Pasta Primavera',
            description: 'Pasta tossed with fresh veggies and olive oil.',
            price: '$17',
            imgSrc: '/images/Pasta-Primavera.jpg',
            alt: 'Dish 10',
        },
        {
            id: 11,
            title: 'BBQ Ribs',
            description: 'Succulent BBQ ribs with a smoky glaze.',
            price: '$25',
            imgSrc: '/images/BBQ-Ribs.jpg',
            alt: 'Dish 11',
        },
        {
            id: 12,
            title: 'Fish Tacos',
            description: 'Crispy fish tacos with a tangy sauce.',
            price: '$18',
            imgSrc: '/images/Fish-Tacos.jpg',
            alt: 'Dish 12',
        },

    ]

    return (
        <section>
            <div className="flex flex-wrap">
                {data.map(item => (

                    <div key={item.id} className="p-1  mb-3 md:mb-0 md:p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <div className="group relative rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
                        <Image
                            src={item.imgSrc}
                            alt={item.alt}
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 w-full text-white">
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p className="text-sm">{item.description}</p>
                            <p className="font-bold">{item.price}</p>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Cards
