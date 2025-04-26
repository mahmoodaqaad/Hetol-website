import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {

    try {
        const payment = await prisma.payment.findUnique({
            where: { id: Number(params.id) },
            select: {
                id: true,
                amount: true,
                method: true,
                status: true,
                userId: true,
                createdAt: true,
                booking: {
                    select: {
                        totalAmount: true
                    }
                }
            }
        })
        if (!payment) return NextResponse.json({ message: "Payment not found" }, { status: 404 })
        return NextResponse.json(payment, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "intrenal Server Error" }, { status: 500 })

    }

}


export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {

    try {
        const payment = await prisma.payment.findUnique({ where: { id: Number(params.id) } })
        if (!payment) return NextResponse.json({ message: "Payment not found" }, { status: 404 })
        const book = await prisma.booking.findUnique({ where: { id: Number(payment.bookingId) } })
        const body = await req.json()

        const oldAmount = Number(book?.paidAmount)

        if (Number(body.amount) + Number(payment.amount) > Number(book?.totalAmount)) return NextResponse.json({ message: "The amount paid is greater than the requested amount." }, { status: 404 })


        await prisma.payment.update({
            where: { id: Number(params.id) },
            data: {
                method: body.method,
                amount: oldAmount + Number(body.amount),
                status: oldAmount + Number(body.amount) === Number(book?.totalAmount) ? "paid" : "pending"
            }
        })

        await prisma.booking.update({
            where: { id: Number(payment.bookingId) },
            data: {
                paidAmount: oldAmount + Number(body.amount),
                remainingAmount: Number(book?.totalAmount) - (oldAmount + Number(body.amount)),
                paymentStatus: oldAmount + Number(body.amount) === Number(book?.totalAmount) ? "paid" : "pending"
            }

        })
        return NextResponse.json({ message: "updated" }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "intrenal Server Error" }, { status: 500 })

    }

}


export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {

    try {
        const payment = await prisma.payment.findUnique({ where: { id: Number(params.id) } })
        if (!payment) return NextResponse.json({ message: "Payment not found" }, { status: 404 })
        // const book = await prisma.booking.findUnique({ where: { id: Number(payment.bookingId) } })

        // const oldAmount = Number(book?.paidAmount)



        await prisma.payment.delete({ where: { id: Number(params.id) } })

        // await prisma.booking.update({
        //     where: { id: Number(payment.bookingId) },
        //     data: {
        //         paidAmount: oldAmount + Number(body.amount),
        //         remainingAmount: Number(book?.totalAmount) - (oldAmount + Number(body.amount)),
        //         paymentStatus: oldAmount + Number(body.amount) === Number(book?.totalAmount) ? "paid" : "pending"
        //     }

        // })
        return NextResponse.json({ message: "updated" }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "intrenal Server Error" }, { status: 500 })

    }

}

