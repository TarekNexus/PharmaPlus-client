/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { medicineService } from "@/services/medicine.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  UserCheck,
  UserMinus,
  ShoppingCart,
  Tags,
  Pill,
} from "lucide-react";
import Loader from "@/components/dashboard/Loader";
import { adminUserService } from "@/services/admin.service";
import { orderService } from "@/services/order.service";
import { categoryService } from "@/services/category.service";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [customersCount, setCustomersCount] = useState<number>(0);
  const [adminsCount, setAdminsCount] = useState<number>(0);
  const [sellersCount, setSellersCount] = useState<number>(0);
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  const [medicinesCount, setMedicinesCount] = useState<number>(0);
  const [ordersChartData, setOrdersChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [usersRes, ordersRes, categoriesRes, medicinesRes] =
        await Promise.all([
          adminUserService.getAllUsers(),
          orderService.getAllOrders(),
          categoryService.getAllCategory(),
          medicineService.getAllMedicines(),
        ]);

      const users = usersRes.data || [];
      const orders = ordersRes || [];

      // User counts
   
      setCustomersCount(users.filter((u: any) => u.role === "CUSTOMER").length);

      setAdminsCount(users.filter((u: any) => u.role === "ADMIN").length);
  
      setSellersCount(users.filter((u: any) => u.role === "SELLER").length);

      setOrdersCount(orders.length);
      setCategoriesCount(categoriesRes.data?.length || 0);
      setMedicinesCount(medicinesRes.data?.length || 0);

   
      const ordersByDate: { [key: string]: number } = {};
   
      orders.forEach((order: any) => {
        const date = new Date(order.createdAt).toLocaleDateString();
        ordersByDate[date] = (ordersByDate[date] || 0) + 1;
      });

      const chartData = Object.keys(ordersByDate).map((date) => ({
        date,
        orders: ordersByDate[date],
      }));
      setOrdersChartData(chartData);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
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

  const stats = [
    {
      title: "Customers",
      value: customersCount,
      icon: <Users size={24} color="#3b82f6" />,
    },
    {
      title: "Admins",
      value: adminsCount,
      icon: <UserCheck size={24} color="#22c55e" />,
    },
    {
      title: "Sellers",
      value: sellersCount,
      icon: <UserMinus size={24} color="#f97316" />,
    },
    {
      title: "Orders",
      value: ordersCount,
      icon: <ShoppingCart size={24} color="#a855f7" />,
    },
    {
      title: "Categories",
      value: categoriesCount,
      icon: <Tags size={24} color="#16a34a" />,
    },
    {
      title: "Medicines",
      value: medicinesCount,
      icon: <Pill size={24} color="#ef4444" />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
      <h1 className="lg:text-3xl md:lg:text-3xl text-2xl font-satoshi font-bold text-[#FF833B] mb-4">
        Dashboard Overview
      </h1>

      {/* Stats cards */}
      <ScrollArea className="w-full mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className=" border-2 border-[#FF833B]  shadow-md hover:shadow-lg transition"
            >
              <CardHeader className="flex items-center gap-4">
                {stat.icon}
                <CardTitle className="text-lg font-satoshi font-semibold">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold font-satoshi text-[#FF833B]">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

     <div className="bg-white shadow-md rounded-xl p-2 md:p-5">
  <h2 className="lg:text-3xl md:lg:text-3xl text-2xl font-satoshi font-bold text-[#FF833B] mb-4">
    Orders Overview
  </h2>

  <ResponsiveContainer width="100%" height={320}>
    <LineChart data={ordersChartData}>
      
      {/* gradient using your brand color */}
      <defs>
        <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF833B" stopOpacity={0.9}/>
          <stop offset="50%" stopColor="#FFB38A" stopOpacity={0.6}/>
          <stop offset="100%" stopColor="#FFE5D6" stopOpacity={0.2}/>
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
