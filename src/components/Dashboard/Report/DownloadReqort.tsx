"use client"
import * as XLSX from "xlsx";

import { BookingRequestWithRelations, BookingtWithRelations, RoomWithReltion } from '@/utils/Types'
import { User } from '@prisma/client'
import React from 'react'
import { BiDownload } from 'react-icons/bi'

const DownloadReqort = ({
    
    Users,
    Room,
    Booking,
    BookingRequest,
}: {
    Users: User[]
    Room: RoomWithReltion[]
    Booking: BookingtWithRelations[]
    BookingRequest: BookingRequestWithRelations[]
}) => {



    const handleDownload = () => {
        // تجهيز البيانات بصيغة JSON للملف
        const usersSheet = Users.map((user) => ({
            ID: user.id,
            Name: user.name,
            Email: user.email,
            Role: user.role,
            "Created At": user.createdAt,
        }));

        const roomsSheet = Room.map((room) => ({
            ID: room.id,
            Name: room.name,
            "Created At": room.createdAt,
            Price: `$${room.price}`,
        }));

        const bookingsSheet = Booking.map((booking) => ({
            ID: booking.id,
            "Paid Amount": booking.paidAmount,
            "Room Name": booking.room.name,
            Status: booking.status,
            "Created At": booking.createdAt,
        }));

        const requestsSheet = BookingRequest.map((request) => ({
            ID: request.id,
            "Room Name": request.room.name,
            Request: request.status,
            Status: request.status,
            "Created At": request.createdAt,
        }));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        const createSheet = (data: any[], sheetName: string) => {
            if (data.length === 0) return XLSX.utils.aoa_to_sheet([["No data"]]);

            const ws = XLSX.utils.json_to_sheet(data);

            // ضبط عرض الأعمدة بناءً على المحتوى
            const colWidths = Object.keys(data[0]).map((key) => ({
                wch: Math.max(
                    key.length + 2,
                    ...data.map((row) => row[key]?.toString().length + 2 || 10)
                ),
            }));
            ws["!cols"] = colWidths;

            // تنسيق الهيدر (Bold + لون خلفية أزرق)
            const headers = Object.keys(data[0]);
            headers.forEach((header, index) => {
                const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
                if (!ws[cellRef]) return;

                ws[cellRef].s = {
                    font: { bold: true, color: { rgb: "FFFFFF" } }, // نص أبيض
                    fill: { fgColor: { rgb: "4F81BD" } }, // خلفية زرقاء
                    alignment: { horizontal: "center", vertical: "center" }, // توسيط النص
                };
            });

            return ws;
        };

        // إنشاء ملف Excel وإضافة الأوراق إليه
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, createSheet(usersSheet, "Users"), "Users");
        XLSX.utils.book_append_sheet(workbook, createSheet(roomsSheet, "Rooms"), "Rooms");
        XLSX.utils.book_append_sheet(workbook, createSheet(bookingsSheet, "Bookings"), "Bookings");
        XLSX.utils.book_append_sheet(workbook, createSheet(requestsSheet, "Requests"), "Requests");

        // تنزيل الملف
        XLSX.writeFile(workbook, "Report.xlsx");
    };


    return (
        <button
            onClick={handleDownload}
            className="bg-indigo-700 flex items-center justify-between gap-4 text-white px-3 py-2 text-xl rounded hover:bg-indigo-500 transition-all"
        >
            Download <BiDownload />
        </button>
    )
}

export default DownloadReqort
