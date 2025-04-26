import { IsSuperAdminOrAdminOrManager } from "@/utils/CheckRole";
import { ARTICLE_PER_PAGE } from "@/utils/consant";
import prisma from "@/utils/db";
import { CreateBookingRequestDto } from "@/utils/Dtos";
import { varfiyToken } from "@/utils/verfiyToken";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (req: NextRequest) => {
    const isAllowd = IsSuperAdminOrAdminOrManager(req)

    if (!isAllowd) {

        return NextResponse.json({ message: "your not allowd ,for biden" }, { status: 403 })
    } const pageNumber = req.nextUrl.searchParams.get("pageNumber") || 1

    const request = await prisma.bookingRequest.findMany({
        skip: ARTICLE_PER_PAGE * (Number(pageNumber) - 1),
        take: ARTICLE_PER_PAGE,
        select: {
            checkIn: true,
            checkOut: true,
            id: true,
            createdAt: true,
            status: true,
            roomId: true,
            userId: true,
            room: {
                select: {
                    name: true
                }
            },
            user: {
                select: {
                    name: true
                }
            }
        }
    })
    return NextResponse.json(request, { status: 200 })

}


export const POST = async (req: NextRequest) => {
    try {

        const ISuser = varfiyToken(req)
        if (!ISuser) {

            return NextResponse.json({ message: "your not allowd ,for bidena" }, { status: 403 })
        }
        const { userId, roomId, checkIn, checkOut }: CreateBookingRequestDto = await req.json();

        if (!userId) return NextResponse.json({ message: "userId not Found" }, { status: 404 })

        if (!roomId) return NextResponse.json({ message: "roomId not Found" }, { status: 404 })

        if (!checkIn) return NextResponse.json({ message: "checkIn not Found" }, { status: 404 })

        if (!checkOut) return NextResponse.json({ message: "checkOut not Found" }, { status: 404 })
        if (Number(new Date(checkOut).getTime()) - Number(Number(new Date(checkIn).getTime())) <= 0) return NextResponse.json({ message: "check in is after check out" }, { status: 404 })

        const checkInn = new Date(checkIn);
        const checkOutn = new Date(checkOut);
        // return NextResponse.json({ userId, roomId, checkIn, checkOut }, { status: 500 })
        const IdUser = await prisma.user.findUnique({ where: { id: Number(userId) } })
        if (!IdUser) return NextResponse.json({ message: "User not Found" }, { status: 404 })

        const Room = await prisma.room.findUnique({ where: { id: Number(roomId) } })
        // return NextResponse.json(Room, { status: 500 })
        if (!Room) return NextResponse.json({ message: "Room not Found" }, { status: 404 })
        const IsRoomVar = Room?.status === "booked"
        // في السمتقبل شوف اذا محجوزة او لا او اذا التواريخ كويسة  
        if (IsRoomVar) return NextResponse.json({ message: "this Room is booked" }, { status: 400 })

        const newRequst = await prisma.bookingRequest.create({
            data: {
                userId: Number(userId),
                roomId: Number(roomId),
                checkIn: checkInn,
                checkOut: checkOutn
            }
        })
        await prisma.room.update({
            where: { id: Number(roomId) }
            ,
            data: {

                status: "requested"
            }
        })

        return NextResponse.json({ message: "add requst", newRequst }, { status: 201 })

    } catch (error) {
        console.log("****************");

        console.log(error);

        return NextResponse.json({ message: "Error in inrenal Server", error }, { status: 500 })
    }

}
