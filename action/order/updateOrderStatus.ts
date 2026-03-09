"use server";





import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";

export  const updateOrderStatus = async (orderId: string, status: string) => {
    const cookieStore = await cookies();
    try {
      const res = await orderService.updateOrderStatus(orderId, status, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to update order status" };
    }
};