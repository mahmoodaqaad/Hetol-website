
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css"
import { ToastContainer } from "react-toastify";
import NavBarContextProvider from "@/Context/navBarContext"
import "react-toastify/dist/ReactToastify.css"
import Header from "@/components/WebSite/header/Header";
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
                <Header />
                <ToastContainer theme="colored" />
                <NavBarContextProvider>


                    {children}
                </NavBarContextProvider>
            </body>
        </html>
    );
}
