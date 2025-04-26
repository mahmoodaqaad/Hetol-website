import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export const POST = async (req: NextRequest) => {
    try {
        const { message, type, userId } = await req.json();

        const notification = await prisma.notification.create({
            data: {
                message,
                type,
                userId,
            },
        });

        return NextResponse.json(notification, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};

export const GET = async (req: NextRequest) => {
    try {
        const userId = Number(req.nextUrl.searchParams.get("userId"));

        if (!userId) {
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(notifications, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal error", error }, { status: 500 });
    }
};

