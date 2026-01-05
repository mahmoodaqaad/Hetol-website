import { DOMAIN } from "@/utils/consant";
import { getFetchAll, getFetchById } from "@/utils/FetchData";
import { notFound, redirect } from "next/navigation";

export const getRooms = async (pageNumber: string | number, search: string = "", sort: string = "", order: string = "", filter: string = "") => {

    const response = await getFetchAll("rooms", pageNumber, search, sort, order, filter)
    if (response.status === 403) redirect("/dashboard/403")
    if (!response?.ok) {
        throw new Error("Failed to fetch rooms")
    }
    return response.json();
}
export const getRoomsCount = async () => {

    const response = await fetch(`${DOMAIN}/api/rooms/count`)

    if (!response?.ok) {
        throw new Error("Failed to fetch rooms")
    }
    return response.json();
}
export const getSingleRoom = async (id: string) => {

    const response = await getFetchById("rooms", id)
    if (response.status === 403) redirect("/dashboard/403")
    if (!response?.ok) {
        if (response.status !== 404) {
            throw new Error("Failed to fetch single user")
        }
        else {

            notFound()
        }
    }
    return response.json();
}


export const getRoomsBySearch = async (search: string) => {

    const response = await fetch(`${DOMAIN}/api/rooms/search?search=${search}`)
    if (!response.ok)
        throw new Error("Failed to Fetch rooms search")
    return response.json()

}