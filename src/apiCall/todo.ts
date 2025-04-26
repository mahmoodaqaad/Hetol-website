import { getFetchAll, getFetchById } from "@/utils/FetchData";
import { notFound, redirect } from "next/navigation";

export const GetAllTodo = async () => {

    const response = await getFetchAll("todo")

    console.log(response);
    if (response.status === 403) redirect("/dashboard/403")
    if (!response?.ok) {
        throw new Error("Failed to fetch booking-requests")
    }
    return response.json();
}
export const getMyTodo = async (id: number) => {

    const response = await getFetchById("todo/myTodo", id)

    if (!response?.ok) {
        if (response.status === 403) redirect("/dashboard/403")

        if (response.status !== 404) {

            throw new Error("Failed to fetch single user")
        }
        else {

            notFound()
        }
    }
    return response.json();
}