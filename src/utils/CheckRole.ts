import { NextRequest } from "next/server"
import { varfiyToken } from "./verfiyToken"


export const IsSuperAdmin = (req: NextRequest) => {
    const user = varfiyToken(req)
    if (!user) return false
    if (user.role as string === "SuperAdmin") {
        return true
    }
}
export const IsSuperAdminOrAdmin = (req: NextRequest) => {
    const AllRole = [
        "SuperAdmin",
        "Admin",

    ]
    const user = varfiyToken(req)
    if (!user) return false
    if (AllRole.includes(user.role as string)) {
        return true
    }
}
export const IsSuperAdminOrAdminOrManager = (req: NextRequest) => {
    const AllRole = [
        "SuperAdmin",
        "Admin",
        "Manager"
    ]
    const user = varfiyToken(req)
    if (!user) return false
    if (AllRole.includes(user.role as string)) {
        return true
    }
    return false
}
export const IsSuperAdminOrAdminOrManagerPage = (role: string) => {
    const AllRole = [
        "SuperAdmin",
        "Admin",
        "Manager"
    ]

    if (AllRole.includes(role)) {
        return true
    }
    return false
}