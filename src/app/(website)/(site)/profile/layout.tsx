
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Header from "@/components/WebSite/header/Header";
import SideBar from "@/components/WebSite/profile/SideBar/SideBar";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Hotel Book",
    description: "Hotel Book website for booking hotel",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ToastContainer theme="colored" />
                <Header />
                <div className="flex gap-2">
                    <SideBar />

                    <div className="flex-1 p-3   vh-site">
                        {children}
                    </div>

                </div>
            </body>
        </html>
    );
}
