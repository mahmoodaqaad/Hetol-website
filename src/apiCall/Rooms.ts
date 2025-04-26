import { DOMAIN } from "@/utils/consant";
import { getFetchAll, getFetchById } from "@/utils/FetchData";
import { notFound, redirect } from "next/navigation";

export const getRooms = async (pageNumber: string) => {

    const response = await getFetchAll("rooms", Number(pageNumber))
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

