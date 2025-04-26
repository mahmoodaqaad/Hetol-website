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
            <BookRoomTime />

            <Rooms count={count} />
        </div>
    )
}

export default HomePage
