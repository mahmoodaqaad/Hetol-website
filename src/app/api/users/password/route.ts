import prisma from "@/utils/db";
import { updatePasswordDto } from "@/utils/Dtos";
import { varfiyToken } from "@/utils/verfiyToken";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse as res } from "next/server";

export const PUT = async (req: NextRequest) => {

    try {


        const user = await varfiyToken(req)

        if (!user) return res.json({ message: "only user login" }, { status: 401 })
        const myUser = await prisma.user.findUnique({ where: { id: user?.id } })

        if (!myUser) return res.json({ message: "User Not Found" }, { status: 404 })
        const body = await req.json() as updatePasswordDto

        const IsMyPassword = await bcrypt.compare(body.old, myUser.password)

        if (!IsMyPassword) return res.json({ message: "password is not correct" }, { status: 404 })

        const salt = await bcrypt.genSalt(10)

        const newPassword = await bcrypt.hash(body.new, salt)

        await prisma.user.update({
            where: { id: user?.id },
            data: {
                password: newPassword
            }
        })
        return res.json({ message: "Updated" }, { status: 200 })
    } catch (error) {
        return res.json({ message: "500 intrenal error", error }, { status: 500 })

    }

}