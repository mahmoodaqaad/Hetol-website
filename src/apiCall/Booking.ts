import { notFound, redirect } from "next/navigation";
import { getFetchAll, getFetchById } from "@/utils/FetchData";
import { DOMAIN } from "@/utils/consant";


export const GetBooking = async (pageNumber: string, search: string = "") => {
    const response = await getFetchAll("bookings", pageNumber, search)

    if (response.status === 403) redirect("/dashboard/403")
    if (!response?.ok) {
        throw new Error("Failed to fetch booking")
    }

    return response.json();
}

export const getBookingCount = async () => {

    const response = await fetch(`${DOMAIN}/api/bookings/count`)

    if (!response?.ok) {
        throw new Error("Failed to fetch booking count")
    }
    return response.json();
}
export const getSingleRoomRequest = async (id: string) => {

    const response = await getFetchById("bookings", id)
    if (!response?.ok) {
        console.log(response);
        if (response.status !== 404) {

            throw new Error("Failed to fetch single booking")
        }
        else {

            notFound()
        }
    }
    return response.json();
}