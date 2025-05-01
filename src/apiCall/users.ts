import { DOMAIN } from "@/utils/consant";
import { getFetchAll, getFetchById } from "@/utils/FetchData";
import { notFound, redirect } from "next/navigation";

export const getUser = async (pageNumber: string, search: string) => {

    const response = await getFetchAll("users", pageNumber, search)
    if (response.status === 403) redirect("/dashboard/403")

    if (!response?.ok) {
        throw new Error("Failed to fetch articles")
    }
    return response.json();
}

export const getUserCount = async () => {
    const response = await fetch(`${DOMAIN}/api/users/count`)

    if (!response?.ok) {
        throw new Error("Failed to fetch User Count")
    }
    return response.json();

}
export const getSingleUser = async (id: string) => {

    const response = await getFetchById("users", id)
    if (response.status === 403) redirect("/dashboard/403")
    if (!response?.ok) {
        console.log("*******************************************");
        console.log(response);
        if (response.status !== 404) {

            throw new Error("Failed to fetch single user")
        }
        else {

            notFound()
        }
    }
    return response.json();
}