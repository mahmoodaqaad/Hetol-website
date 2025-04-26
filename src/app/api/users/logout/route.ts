
/**
 * @method POST
 * @route ~/api/users/login
 * @description lgoin user (login||sign in)=> تسجيل حساب
 * @access public
 */

import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export const POST = async () => {
    try {
        (await cookies()).delete("jwt")
        return NextResponse.json({ message: "Logout" }, { status: 200 })

    }
    catch (error) {
        console.log(error);


        return NextResponse.json({ message: "internal server error", error }, { status: 500 })

    }

}