import prisma from "@/utils/db";
import { varfiyToken } from "@/utils/verfiyToken";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string }

}

export const GET = async (req: NextRequest, { params: { id } }: Props) => {
    try {
        const Myuser = await varfiyToken(req) as User

        if (Myuser.id !== +id) {
            return NextResponse.json({ message: "not allowed,for bidden" }, { status: 403 })
        }

        const user = await prisma.user.findUnique({
            where: { id: Number(id) }, include: {
                Notification: true,
                Saved: {
                    include:
                    {
                        room: {
                            include: { images: true }
                        }

                    }
                },
                comments: {
                    include:
                    {
                        room: {
                            include: { images: true }
                        }

                    }
                },
                Todo: true,
                bookings: {
                    include:
                    {
                        room: {
                            include: { images: true }
                        }

                    }
                },
                bookingRequests: {
                    include:
                    {
                        room: {
                            include: { images: true }

                        }

                    }
                }
            }
        })
        if (!user) return NextResponse.json({ message: "user Not found" }, { status: 404 });

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "internal server error", error }, { status: 500 })

    }

}