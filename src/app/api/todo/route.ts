import { IsSuperAdmin, IsSuperAdminOrAdminOrManager } from "@/utils/CheckRole";
import prisma from "@/utils/db";
import { CreateTodoDto } from "@/utils/Dtos";
import { createTodoSchema } from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

    try {
        if (!IsSuperAdmin(req)) return NextResponse.json({ message: "your not allowd ,for biden" }, { status: 403 })

        const Todos = await prisma.todo.findMany()
        return NextResponse.json(Todos, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "500 intrenal error", error }, { status: 500 })

    }

}
export const POST = async (req: NextRequest) => {
    try {
        const isAllowd = IsSuperAdminOrAdminOrManager(req)

        if (!isAllowd) {

            return NextResponse.json({ message: "your not allowd ,for biden" }, { status: 403 })
        }


        const body = (await req.json()) as CreateTodoDto


        const { title, userId, discrption } = body

        const valiedate = createTodoSchema.safeParse(body)

        if (!valiedate.success) return NextResponse.json({ message: valiedate.error.errors[0].message }, { status: 400 })

        const todo = await prisma.todo.create({
            data: {
                title,
                discrption,
                userId,

            }
        });

        return NextResponse.json(todo, { status: 201 });

    } catch (error) {
        console.log(error);
    }


}