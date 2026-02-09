/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { sellerService } from "@/services/seller.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loader from "@/components/dashboard/Loader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ShoppingCart, Pill, UserCheck, UserMinus } from "lucide-react";

export default function SellerDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [ordersChartData, setOrdersChartData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalMedicines: 0,
    placedOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const orders = await sellerService.getAllOrdersSeller();
      const medicines = await sellerService.getAllMedicinesbySeller();

      // Count order statuses
      const placed = orders.filter((o: any) => o.status === "PLACED").length;
      const processing = orders.filter((o: any) => o.status === "PROCESSING").length;
      const shipped = orders.filter((o: any) => o.status === "SHIPPED").length;
      const delivered = orders.filter((o: any) => o.status === "DELIVERED").length;
      const cancelled = orders.filter((o: any) => o.status === "CANCELLED").length;

      // Transform orders into chart data (per day)
      const ordersByDate: { [key: string]: number } = {};
      orders.forEach((order: any) => {
        if (!order.createdAt) return;
        const date = new Date(order.createdAt).toISOString().slice(0, 10);
        ordersByDate[date] = (ordersByDate[date] || 0) + 1;
      });

      const chartData = Object.keys(ordersByDate)
        .map(date => ({ date, orders: ordersByDate[date] }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setOrdersChartData(chartData);

      setStats({
        totalOrders: orders.length,
        totalMedicines: medicines.data?.length || medicines.length,
        placedOrders: placed,
        processingOrders: processing,
        shippedOrders: shipped,
        deliveredOrders: delivered,
        cancelledOrders: cancelled,
      });
    } catch (error) {
      console.error("Failed to fetch seller stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // Stats array for cards (same design as Admin Dashboard)
  const statsCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingCart size={24} color="#a855f7" />,
    },
    {
      title: "Placed Orders",
      value: stats.placedOrders,
      icon: <UserCheck size={24} color="#22c55e" />,
    },
    {
      title: "Processing Orders",
      value: stats.processingOrders,
      icon: <UserMinus size={24} color="#f97316" />,
    },
    {
      title: "Shipped Orders",
      value: stats.shippedOrders,
      icon: <ShoppingCart size={24} color="#3b82f6" />,
    },
    {
      title: "Delivered Orders",
      value: stats.deliveredOrders,
      icon: <UserCheck size={24} color="#16a34a" />,
    },
    {
      title: "Total Medicines",
      value: stats.totalMedicines,
      icon: <Pill size={24} color="#f43f5e" />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full space-y-6">
      <h1 className="text-3xl font-bold text-[#FF833B] font-satoshi">Seller Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((card) => (
          <Card
            key={card.title}
            className="border-2 border-[#FF833B] shadow-md hover:shadow-lg transition"
          >
            <CardHeader className="flex items-center gap-4">
              {card.icon}
              <CardTitle className="text-lg font-satoshi font-semibold">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold font-satoshi text-[#FF833B]">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          className="bg-[#FF833B] hover:bg-[#ff6f1f] font-satoshi w-full"
          onClick={() => router.push("/seller/orders")}
        >
          View Orders
        </Button>

        <Button
          className="bg-[#FF833B] hover:bg-[#ff6f1f] font-satoshi w-full"
          onClick={() => router.push("/seller/medicines")}
        >
          Manage Medicines
        </Button>
      </div>

      {/* Orders Chart */}
      <div className="bg-white shadow-md rounded-xl p-2 md:p-5 border">
        <h2 className="text-2xl lg:text-3xl font-satoshi font-bold text-[#FF833B] mb-4">
          Orders Overview
        </h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={ordersChartData}>
            <defs>
              <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF833B" stopOpacity={0.9} />
                <stop offset="50%" stopColor="#FFB38A" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#FFE5D6" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#FF833B"
              strokeWidth={3}
              fill="url(#ordersGradient)"
              dot={{ r: 4, fill: "#FF833B" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
