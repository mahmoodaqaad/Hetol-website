import { socket } from "@/lib/socketClints";
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
        const writerComment = await prisma.user.findUnique({ where: { id: Number(userId) }, select: { name: true } })
        const room = await prisma.room.findUnique({ where: { id: Number(roomId) }, select: { name: true, id: true } })
        const users = await prisma.user.findMany({ where: { role: "SuperAdmin" }, select: { id: true } })


        const messageNotif = `${writerComment?.name} Comment for a room (${room?.name})`

        // const nofictionForDataBase = []
        // users.map(async (item) => {


        //     const newd = await prisma.notification.create({
        //         data: {

        //             message: messageNotif,
        //             userId: item.id,
        //             type: "booking-requesr",
        //         }, select: {
        //             id: true,
        //             message: true,
        //             isRead: true,
        //             userId: true,
        //             createdAt: true,
        //             type: true,
        //         }

        //     })

        //     await nofictionForDataBase.push(newd)

        // })



        const newNofticetion = await prisma.notification.create({
            data: {

                message: messageNotif,
                userId: users[0]?.id,
                type: "booking-requesr",
            }, select: {
                id: true,
                message: true,
                isRead: true,
                userId: true,
                createdAt: true,
                type: true,
            }

        })
        console.log("d========================>", newNofticetion);
        return NextResponse.json({ message: "Comment Added", notf: { newNofticetion, roomId: room?.id } }, { status: 201 })


    } catch (error) {
        return NextResponse.json({ message: "500 intrenal error", error }, { status: 500 })

    }

}

