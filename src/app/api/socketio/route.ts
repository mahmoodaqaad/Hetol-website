import { Server as IOServer } from "socket.io";
import { setIO } from "@/lib/socket";

// لازم نكون متأكدين إنه هاد الملف ديناميكي
export const dynamic = "force-dynamic";

// لازم تستخدم هذا لتشغيل السيرفر
export async function GET(request: Request) {
    // @ts-ignore
    const res = request as any;

    if (!res.socket?.server?.io) {
        console.log("🚀 Starting Socket.IO server...");

        const io = new IOServer(res.socket.server, {
            path: "/api/socketio",
            addTrailingSlash: false,
        });

        // خزّن نسخة io في الذاكرة عشان نقدر نستخدمها بـ getIO()
        setIO(io);

        io.on("connection", (socket) => {
            console.log("🟢 New socket connected:", socket.id);

            socket.on("join", (userId) => {
                socket.join(userId.toString());
            });

            socket.on("disconnect", () => {
                console.log("🔴 Disconnected:", socket.id);
            });
        });

        // تأكد من أن res.socket.server io تم تعيينه بشكل صحيح
        res.socket.server.io = io;
    } else {
        console.log("Socket.IO server already running.");
    }

    return new Response("Socket server is running");
}

