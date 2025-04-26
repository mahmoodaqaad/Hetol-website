"use client"

import React from "react";
import { Bar, Pie, Line, Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
} from "chart.js";
import { DataType } from "@/utils/Types";

ChartJS.register(
    CategoryScale, LinearScale, BarElement, LineElement,
    PointElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale
);

const ReportChart = ({ users, rooms, bookings, bookingRequests }: DataType) => {
    // حساب المتوسط الأسبوعي والشهري (كمثال، يمكن تعديله وفق البيانات الفعلية)
    const avgLastWeek = (bookings.length + bookingRequests.length) / 7;
    const avgLastMonth = (bookings.length + bookingRequests.length) / 30;

    const barData = {
        labels: ["Users", "Rooms", "Bookings", "Booking Requests"],
        datasets: [
            {
                label: "Total Count",
                data: [users.length, rooms.length, bookings.length, bookingRequests.length],
                backgroundColor: ["#4F81BD", "#F39C12", "#27AE60", "#E74C3C"],
                borderRadius: 5,
            },
        ],
    };

    const pieData = {
        labels: ["Users", "Rooms", "Bookings", "Booking Requests"],
        datasets: [
            {
                data: [users.length, rooms.length, bookings.length, bookingRequests.length],
                backgroundColor: ["#4F81BD", "#F39C12", "#27AE60", "#E74C3C"],
            },
        ],
    };

    const lineData = {
        labels: ["Last Month", "Last Week"],
        datasets: [
            {
                label: "Average Bookings & Requests",
                data: [avgLastMonth, avgLastWeek],
                borderColor: "#3498DB",
                backgroundColor: "rgba(52, 152, 219, 0.2)",
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const radarData = {
        labels: ["Users", "Rooms", "Bookings", "Booking Requests"],
        datasets: [
            {
                label: "Data Distribution",
                data: [users.length, rooms.length, bookings.length, bookingRequests.length],
                backgroundColor: "rgba(231, 76, 60, 0.4)",
                borderColor: "#E74C3C",
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Reports Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Summary (Bar Chart)</h3>
                    <Bar data={barData} />
                </div>

                {/* Pie Chart */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Distribution (Pie Chart)</h3>
                    <Pie data={pieData} />
                </div>

                {/* Line Chart */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Average Bookings (Line Chart)</h3>
                    <Line data={lineData} />
                </div>

                {/* Radar Chart */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Comparison (Radar Chart)</h3>
                    <Radar data={radarData} />
                </div>
            </div>
        </div>
    );
};

export default ReportChart;
