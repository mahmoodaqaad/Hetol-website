import { cookies } from "next/headers"
import { DOMAIN } from "./consant"

export const getFetchAll = async (key: string, page = "1", search:string="") => {
    const token = (await cookies()).get("jwt")?.value

    const response = await fetch(`${DOMAIN}/api/${key}?pageNumber=${page}&search=${search}`, {
        credentials: "include", 
        headers: {
            Cookie: `jwt=${token}`
        }
    })
    return response
}

export const getFetchById = async (key: string, id: string | number) => {
    const token = (await cookies()).get("jwt")?.value

    const response = await fetch(`${DOMAIN}/api/${key}/${id}`, {
        credentials: "include", 
        headers: {
            Cookie: `jwt=${token}`
        }
    })
    return response
}
