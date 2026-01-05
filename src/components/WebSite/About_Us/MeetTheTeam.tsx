import Image from 'next/image';
import React from 'react';

const team = [
    { name: "Sarah Johnson", role: "General Manager", img: "/images/r44.jpg" },
    { name: "Mark Lee", role: "Head Chef", img: "/images/r32.jpg" },
    { name: "Emily Davis", role: "Receptionist", img: "/images/r64.jpg" },
];

const MeetTheTeam = () => {
    return (
        <section className="py-12 px-6 md:px-16 bg-white dark:bg-gray-700 text-center">
            <h3 className="text-3xl font-bold mb-10">Meet Our Team</h3>
            <div className="flex flex-wrap justify-center gap-8">
                {team.map((member, i) => (
                    <div key={i} className="w-64 text-center">
                        <Image src={member.img} width={32} height={32} className="w-32 h-32 mx-auto rounded-full mb-4" alt={member.name} />
                        <h4 className="text-xl font-semibold">{member.name}</h4>
                        <p className="text-gray-500 dark:text-gray-200">{member.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MeetTheTeam;
