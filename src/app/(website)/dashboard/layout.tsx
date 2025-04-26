import NavBarDashboard from "@/components/Dashboard/NavBarDashboard/NavBarDashboard";
import SideBar from "@/components/Dashboard/SideBar/SideBar";
import DashboardContext from "@/Context/DashboardContext";
import { IsSuperAdminOrAdminOrManagerPage } from "@/utils/CheckRole";
import { varfiyTokenForPage } from "@/utils/verfiyToken";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user = await varfiyTokenForPage() as User
    if (!user) redirect("/login")
    if (!IsSuperAdminOrAdminOrManagerPage(user.role)) redirect("/403")
    return (
        <html lang="en" >

            <body className="dark:bg-gray-950">
                <ToastContainer theme="colored" />

                <DashboardContext>
                    <div className="flex gap-2 ">
                        <SideBar user={user} />
                        <div className="overflow-auto relative transition-all flex-1   bg-white dark:bg-slate-800 dark:text-white">

                            <NavBarDashboard />
                            <div className="p-3">

                                {children}
                            </div>
                        </div>
                    </div>
                </DashboardContext>
            </body>
        </html>
    );
}
