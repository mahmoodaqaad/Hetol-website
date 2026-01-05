import "./hero.css"

const Hero = () => {
    return (
        <>
            <div className="hero p-0 lg:py-[30px]">
                <div className="overlay "></div>
                <div className="flex w-full h-[800px]  justify-center lg:justify-end items-center text-white ">
                    <div className="  w-full lg:w-1/2 p-1">
                        <h2 className="text-center lg:text-start font-semibold text-lg sm:text-2xl tracking-widest mb-4 uppercase text-yellow-200">More than a hotel... an experience</h2>
                        <h1 className="text-center lg:text-start font-semibold text-3xl sm:text-6xl lg:text-8xl">
                            Hotel for the whole
                            <br />
                            family,
                            all year round.
                        </h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero
