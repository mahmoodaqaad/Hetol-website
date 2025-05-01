import { getRoomsCount } from "@/apiCall/Rooms"
import BookRoomTime from "@/components/WebSite/BookRoomTime/BookRoomTime"
import Header from "@/components/WebSite/header/Header"
import Hero from "@/components/WebSite/Hero/Hero"
import Rooms from "@/components/WebSite/Rooms/Rooms"

const HomePage = async () => {
    const count: number = await getRoomsCount()
    return (
        <div>
            <Header />
            <Hero />
            <div className="my-[-10px]  lg:w-2/3 w-11/12 mx-auto ">

                <BookRoomTime />
            </div>
            <div className="mt-8">

                <Rooms count={count} />
            </div>
        </div>
    )
}

export default HomePage
