import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    try {

        const { text, userId, roomId } = await req.json() as {
            text: string,
            userId: number,
            roomId: number,

        }
        await prisma.comment.create({
            data: {
                text,
                userId,
                roomId,
            }
        })

        return NextResponse.json({ message: "Comment Added" }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: "500 intrenal error", error }, { status: 500 })

    }

}

