import prisma from "@/utils/db";
import { NextResponse as res } from "next/server";


/**
 * @method GET
 * @route ~/api/users/count
 * @description Get article count
 * @access public
 */
export const GET = async () => {
    try {

        const count = await prisma.user.count()

        return res.json(count, { status: 200 })


    } catch (error) {
        return res.json({ message: "internal server error", error }, { status: 500 })

    }
}