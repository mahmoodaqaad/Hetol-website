import { varfiyTokenForPage } from '@/utils/verfiyToken'
import { redirect } from 'next/navigation'
import React from 'react'
interface AuthGuardPagepProps {
    allowedRole: string[]
    children: React.ReactNode

}

const AuthGuardPage = async ({ allowedRole, children }: AuthGuardPagepProps) => {

    const user = await varfiyTokenForPage()

    if (!user || !allowedRole || !allowedRole.includes(user.role)) redirect("/dashboard/403")
    return (
        <div>
            {children}
        </div>
    )
}

export default AuthGuardPage
