// تغغير ل مكتمل او الغاء

import { IsSuperAdminOrAdminOrManager } from "@/utils/CheckRole";
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string }

}

export const PUT = async (req: NextRequest, context: { params: { id: string } }) => {
    try {
        const isAllowd = IsSuperAdminOrAdminOrManager(req)

        if (!isAllowd) {

            return NextResponse.json({ message: "your not allowd ,for biden" }, { status: 403 })
        }
        const { id } = context.params

        // find booking

        const booking = await prisma.booking.findUnique({ where: { id: Number(id) } })

        if (!booking) return NextResponse.json({ message: "book is not found" }, { status: 404 })

        if (booking.status !== "active") return NextResponse.json({ message: "you can not update status for this room" }, { status: 400 })

        await prisma.booking.update({
            where: { id: Number(id) },
            data: { status: "completed" }
        })
        await prisma.room.update({
            where: { id: Number(booking.roomId) },
            data: { status: "available" }
        })


        const room = await prisma.room.findUnique({ where: { id: Number(booking.roomId) }, select: { name: true } })


        await prisma.notification.create({
            data: {
                message: `your booking is complete for room ${room?.name}`,
                userId: booking.userId,
                type: "booking complete"
            }
        })

        return NextResponse.json({ message: "Completed " }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server Error", error }, { status: 500 })

    }

}

export const DELETE = async (req: NextRequest, { params: { id } }: Props) => {

    try {
        const isAllowd = IsSuperAdminOrAdminOrManager(req)

        if (!isAllowd) {

            return NextResponse.json({ message: "your not allowd ,for biden" }, { status: 403 })
        }
        // find booking

        const booking = await prisma.booking.findUnique({ where: { id: Number(id) } })

        if (!booking) return NextResponse.json({ message: "book is not found" }, { status: 404 })

        if (booking.status !== "active") return NextResponse.json({ message: "you can not update status for this room" }, { status: 400 })

        await prisma.booking.update({
            where: { id: Number(id) },
            data: { status: "canceled" }
        })
        await prisma.room.update({
            where: { id: Number(booking.roomId) },
            data: { status: "available" }
        })

        const room = await prisma.room.findUnique({ where: { id: Number(booking.roomId) }, select: { name: true } })


        await prisma.notification.create({
            data: {
                message: `your booking is Canceled for room ${room?.name}`,
                userId: booking.userId,
                type: "booking complete"
            }
        })

        return NextResponse.json({ message: "Canceled " }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server Error", error }, { status: 500 })

    }
}