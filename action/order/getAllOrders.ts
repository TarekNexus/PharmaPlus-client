"use server";





import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";

export  const getAllOrders = async () => {
    const cookieStore = await cookies();
    try {
      const res = await orderService.getAllOrders( cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch all orders" };
    }
};