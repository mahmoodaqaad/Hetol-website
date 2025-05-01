import { DOMAIN } from "@/utils/consant";
import { getFetchAll, getFetchById } from "@/utils/FetchData";
import { notFound, redirect } from "next/navigation";

export const GetRoomsRequest = async (pageNumber: string, search: string = "") => {

    const response = await getFetchAll("booking-requests", pageNumber, search)

    if (response.status === 403) redirect("/dashboard/403")
    if (!response?.ok) {
        throw new Error("Failed to fetch booking-requests")
    }
    return response.json();
}

export const getBookingRequestCount = async () => {

    const response = await fetch(`${DOMAIN}/api/booking-requests/count`)

    if (!response?.ok) {
        throw new Error("Failed to fetch booking request count")
    }
    return response.json();
}
export const getSingleRoomRequest = async (id: string) => {

    const response = await getFetchById("booking-requests", id)

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