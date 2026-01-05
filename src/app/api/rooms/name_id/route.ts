import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const room = await prisma.room.findMany({
            select: {
                name: true,
                id: true
            }
        })

        return NextResponse.json(room, { status: 200 })
    } catch (error) {

        return NextResponse.json({ message: 'Error intrnel Server', error }, { status: 500 });

    }


}