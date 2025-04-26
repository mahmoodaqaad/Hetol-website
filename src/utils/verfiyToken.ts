import jwt from 'jsonwebtoken';
import { JWTPaylod } from "./Types";
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getFetchById } from './FetchData';
import { redirect } from 'next/navigation';
export function varfiyToken(req: NextRequest): JWTPaylod | null {
    try {
        const jwtToken = req.cookies.get("jwt")?.value as string

        const privateKey = process.env.JWT_SECRET_KEY as string

        return jwt.verify(jwtToken, privateKey) as JWTPaylod



    } catch (error) {
        console.log(error);
        return null

    }

}

export async function varfiyTokenForPage(){
    try {
        const token = (await cookies()).get("jwt")?.value || ""

        if (!token) return null;
        const privtKey = process.env.JWT_SECRET_KEY as string;
        const userPayload = jwt.verify(token, privtKey) as JWTPaylod;
        return userPayload || null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function varfiyMyAccount() {
    try {
        const token = (await cookies()).get("jwt")?.value || ""

        if (!token) return null;
        const privtKey = process.env.JWT_SECRET_KEY as string;
        const userPayload = jwt.verify(token, privtKey) as JWTPaylod;
        const response = await getFetchById("users/myAccount", userPayload.id)


        if (response.status === 403) redirect("/dashboard/403")
        if (!response.ok) throw new Error("Error IN Your account")

        return response.json()

    } catch (error) {
        console.log(error);
        return null;
    }
}

