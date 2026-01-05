import { IsSuperAdminOrAdmin } from "@/utils/CheckRole";
import { ARTICLE_PER_PAGE } from "@/utils/consant";
import prisma from "@/utils/db";
import { CreateRoomDto } from "@/utils/Dtos";
import { CreateRoomSchema } from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {




        const pageNumber = req.nextUrl.searchParams.get("pageNumber") || 1

        const limit = Number(req.nextUrl.searchParams.get("limit")) || ARTICLE_PER_PAGE
        const search = req.nextUrl.searchParams.get("search") || ""
        const sort = req.nextUrl.searchParams.get("sort") || "createdAt"
        const order = req.nextUrl.searchParams.get("order") === "asc" ? "asc" : "desc"
        const filter = req.nextUrl.searchParams.get("filter") || ""

        const whereClause: any = {
            name: {
                contains: search,
                mode: "insensitive"
            }
        }
        if (filter) {
            whereClause.status = filter
        }


        if (search != "") {
            const room = await prisma.room.findMany({
                where: whereClause,
                orderBy: {
                    [sort]: order
                },
                include: {
                    images: true
                }

            })
            return NextResponse.json(room, { status: 200 })

        }
        const rooms = await prisma.room.findMany({
            where: filter ? { status: filter as any } : {},
            orderBy: {
                [sort]: order
            },
            skip: limit * (Number(pageNumber) - 1),
            take: limit,
            include: {
                images: true
            }


        });

        return NextResponse.json(rooms, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error", error }, { status: 500 })

    }
}
export const POST = async (req: NextRequest) => {
    try {
        const isAllowd = IsSuperAdminOrAdmin(req)

        if (!isAllowd) {

            return NextResponse.json({ message: "your not allowd ,for biden" }, { status: 403 })
        }


        const body = (await req.json()) as CreateRoomDto


        const validtion = CreateRoomSchema.safeParse(body)
        if (!validtion.success) return NextResponse.json({ message: validtion.error.errors[0].message }, { status: 400 })
        const { name, price, imageUrls, discrption } = body



        const room = await prisma.room.create({
            data: {
                name,
                price,
                discrption,
                images: {
                    create: imageUrls.map((url: string) => ({ imageUrl: url })),
                },
            },
            include: { images: true },
        });

        return NextResponse.json(room, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "500 intrenal error" }, { status: 500 })

    }


}