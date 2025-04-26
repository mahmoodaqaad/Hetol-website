import prisma from "@/utils/db";
import { FilterData } from "@/utils/Dtos";
import { RoomType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    try {

        const { checkIn, checkOut, geust, type } = await req.json() as FilterData


        const checkIn1 = new Date(checkIn);
        const checkOut1 = new Date(checkOut);
        const rooms = await prisma.room.findMany({
            where: {
                roomType: type as RoomType,
                guest: geust,
                OR: [
                    {
                        status: {
                            in: ["available", "requested"]
                        }
                    },
                    {
                        status: "booked",
                        bookings: {
                            none: {
                                AND: [
                                    { checkIn: { lte: checkOut1 } },
                                    { checkOut: { gte: checkIn1 } }
                                ]
                            }
                        }

                    }
                ]
            },
            include: {
                images: true
            }
        });
        if (rooms.length === 0) return NextResponse.json({message:"no result"},{status:404})
            return NextResponse.json(rooms, { status: 200 })

    } catch (error) {
        NextResponse.json({ message: "internal server error", error }, { status: 500 })
    }


}