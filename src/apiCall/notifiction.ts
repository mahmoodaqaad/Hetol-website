import { DOMAIN } from "@/utils/consant";
import { redirect } from "next/navigation";

export const GetMyNotif = async () => {
    const response = await fetch(`${DOMAIN}/api/notifications`)

    if (response.status === 403) redirect("/dashboard/403")
    if (!response?.ok) {
        throw new Error("Failed to fetch notfiction")
    }

    return response.json();
}
