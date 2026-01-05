import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const user = await prisma.user.findMany({
            select: {
                name: true,
                id: true
            }
        })

        return NextResponse.json(user, { status: 200 })
    } catch (error) {

        return NextResponse.json({ message: 'Error intrnel Server', error }, { status: 500 });

    }


}