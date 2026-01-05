import { User } from "@prisma/client";
import { createServer } from "http";
import next from "next"
import { Server } from "socket.io"

const dev = process.env.NODE_ENV !== "production"

const hostname = process.env.HOST_NAME || "localhost"

const port = parseInt(process.env.PORT || "3000", 10)
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler();
let onlineUsers: (User & { socketId: string })[] = [];
app.prepare().then(() => {
    const httpServer = createServer(handle)

    const io = new Server(httpServer)

    io.on("connection", (socket) => {
        console.log(`user Connected : ${socket.id}`);
        const superAdmins = onlineUsers.filter(user => user.role === "SuperAdmin");
        const superAdminSocketIds = superAdmins.map(user => user.socketId);

        socket.on("addNewUser", (userFromClient) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            !onlineUsers.some(user => user.id === userFromClient.id) &&
                onlineUsers.push({
                    ...userFromClient, socketId: socket.id
                })
            const superAdmins = onlineUsers.filter(user => user.role === "SuperAdmin");
            const superAdminSocketIds = superAdmins.map(user => user.socketId);

            superAdminSocketIds.forEach((socketId) => {
                console.log("getOlineUser server soket id +++++++=> ", socketId);
            });
            io.emit("getOnlineUser", onlineUsers);
            console.log("************************----*******************");
            console.log("getOlineUser server=> ", onlineUsers);


        })



        socket.on("createComment", (data) => {
            // message
            // room id
            // type
            console.log("reseved comment =======================>", data);

            socket.to(superAdminSocketIds).emit("getNotif", data)

        })

        socket.on("prov_reques", (data) => {

            const user = onlineUsers.find(item => item.id === data.userId)
            console.log("prov_reques=======>",user);

            // socket.to(user?.socketId).emit("getNotif", data)
        })

        socket.on("disconnect", () => {
            console.log(`user disConnected : ${socket.id}`);
            onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
            console.log(onlineUsers);

            setTimeout(() => {
                io.emit('getOnlineUser', onlineUsers)

            }, 700);
        })

    })
    httpServer.listen(port, () => {
        console.log(`server running on http://${hostname}:${port}`);

    })
})