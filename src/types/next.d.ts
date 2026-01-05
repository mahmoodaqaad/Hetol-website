import { Server as IOServer } from "socket.io";
import type { NextApiResponse } from "next";

export type NextApiResponseWithSocket = NextApiResponse & {
    socket: {
        server: {
            io?: IOServer;
        };
    };
};
