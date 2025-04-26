import { DOMAIN } from "@/utils/consant";
import { getFetchAll, getFetchById } from "@/utils/FetchData";
import { redirect } from "next/navigation";

export const GetPayments = async (pageNumber: string) => {

    const response = await getFetchAll("payments", pageNumber)

    if (response.status === 403) redirect("/dashboard/403")
    if (!response?.ok) {
        throw new Error("Failed to fetch Payments")
    }
    return response.json();
}

export const GetPaymentCount = async () => {

    const response = await fetch(`${DOMAIN}/api/payments/count`)

    if (!response?.ok) {
        throw new Error("Failed to fetch Payments count")
    }
    return response.json();
}
export const getSinglePayment = async (id: string) => {

    const response = await getFetchById("payments", id)
    if (!response?.ok) {
        throw new Error("Failed to fetch booking-requests")
    }
    return response.json();
}