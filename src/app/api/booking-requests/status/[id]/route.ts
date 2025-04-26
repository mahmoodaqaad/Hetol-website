import { getIO } from "@/lib/socket";
import { IsSuperAdminOrAdminOrManager } from "@/utils/CheckRole";
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server"
import { Server } from "socket.io";

interface Props {
    params: { id: string }

}

export const PUT = async (req: NextRequest, { params: { id } }: Props) => {

    try {
        const isAllowd = IsSuperAdminOrAdminOrManager(req)

        if (!isAllowd) {

            return NextResponse.json({ message: "your not allowd ,for biden" }, { status: 403 })
        }
        const request = await prisma.bookingRequest.findUnique({
            where: { id: Number(id) }
        })
        if (!request) {
            return NextResponse.json({ error: 'Request not found' }, { status: 404 });
        }
        const room = await prisma.room.findUnique({ where: { id: Number(request.roomId) } })

        const Newbook = await prisma.booking.create({
            data: {
                userId: request.userId,
                roomId: request.roomId,
                checkIn: request.checkIn,
                checkOut: request.checkOut,
                totalAmount: Number(room?.price),
                remainingAmount: room?.price
            }
        })
        await prisma.payment.create({
            data: {
                userId: request.userId,
                bookingId: Newbook.id,
                amount: 0,
                method: "null",


            }
        })
        await prisma.bookingRequest.update({
            where: { id: Number(id) }, data: {
                status: "approved"

            }
        })
        await prisma.room.update({
            where: { id: Number(request.roomId) },
            data: {
                status: "booked"
            }
        })

        const notif = await prisma.notification.create({
            data: {
                message: "تم قبول طلب الجحز",
                userId: request.userId,
                type: "booking-requesr"
            }
        })

        const io = getIO(); // ✅ صح
        io.to(request.userId.toString()).emit("newNotification", notif);
        
        return NextResponse.json({ message: 'Booking confirmed successfully' }, { status: 200 });

    } catch (error) {
        console.log("*******************");
        console.log(error);
        return NextResponse.json({ message: 'Error intrnel Server', error }, { status: 500 });

    }

}

export const PATCH = async (req: NextRequest, { params: { id } }: Props) => {
    try {
        const isAllowd = IsSuperAdminOrAdminOrManager(req)

        if (!isAllowd) {

            return NextResponse.json({ message: "your not allowd ,for biden" }, { status: 403 })
        }
        const request = await prisma.bookingRequest.findUnique({
            where: { id: Number(id) }
        })
        if (!request) {
            return NextResponse.json({ error: 'Request not found' }, { status: 404 });
        }
        await prisma.bookingRequest.update({
            where: { id: Number(id) }, data: {
                status: "rejected"

            }
        })
        await prisma.room.update({
            where: { id: Number(request.roomId) },
            data: {
                status: "available"
            }
        })
        return NextResponse.json({ message: 'Booking request deleted successfully' }, { status: 200 });

    } catch (error) {
        console.log("*******************");
        console.log(error);
        return NextResponse.json({ message: 'Error intrnel Server', error }, { status: 500 });

    }
}
export const DELETE = async (req: NextRequest, { params: { id } }: Props) => {
    try {
        const isAllowd = IsSuperAdminOrAdminOrManager(req)

        if (!isAllowd) {

            return NextResponse.json({ message: "your not allowd ,for biden" }, { status: 403 })
        }
        const request = await prisma.bookingRequest.findUnique({
            where: { id: Number(id) }
        })
        if (!request) {
            return NextResponse.json({ error: 'Request not found' }, { status: 404 });
        }
        await prisma.bookingRequest.update({
            where: { id: Number(id) }, data: {
                status: "rejected"

            }
        })
        await prisma.room.update({
            where: { id: Number(request.roomId) },
            data: {
                status: "available"
            }
        })
        return NextResponse.json({ message: 'Booking request deleted successfully' }, { status: 200 });

    } catch (error) {
        console.log("*******************");
        console.log(error);
        return NextResponse.json({ message: 'Error intrnel Server', error }, { status: 500 });

    }
}