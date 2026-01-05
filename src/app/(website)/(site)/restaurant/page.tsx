import About_us from "@/components/WebSite/Restaurant/About_us";
// import BookForm from "@/components/WebSite/Restaurant/BookForm";
import Cards from "@/components/WebSite/Restaurant/Cards";
import Hero from "@/components/WebSite/Restaurant/Hero";
import Reviews from "@/components/WebSite/Restaurant/Reviews";
import Work_Hour from "@/components/WebSite/Restaurant/Work_Hour";
import New_Event from "@/components/WebSite/Restaurant/New_Event";
import Video from "@/components/WebSite/Restaurant/Video";
import Day_Dish from "@/components/WebSite/Restaurant/Day_Dish";
import Header from "@/components/WebSite/header/Header";

const RestaurantPage = () => {



    return (
        <div className=" dark:text-white">
            <Header />
            {/* Hero Section */}
            <Hero />
            <div className="px-4 md:px-8">

                {/* Menu Cards */}
                <div className="py-5">

                    <Cards />
                </div>
                <Day_Dish />
                <New_Event />
                <div className="flex items-center flex-wrap">
                    <div className="w-full md:w-1/2 p-3 ">
                        <Video />
                    </div>
                    <div className="w-full md:w-1/2 p-3 ">

                        <About_us />
                    </div>
                </div>
                {/* Working Hours */}
                <Work_Hour />

                {/* About Us */}


                {/* Customer Reviews with Navigation */}
                <Reviews />

                {/* Reservation Form */}
                {/* <BookForm /> */}
            </div>
        </div>
    );
};

export default RestaurantPage;
