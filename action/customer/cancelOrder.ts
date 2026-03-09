"use server";



import { customerService } from "@/services/customer.service";
import { cookies } from "next/headers";

export  const cancelOrder = async (orderId: string) => {
    const cookieStore = await cookies();
    try {
      const res = await customerService.cancelOrder(orderId, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to cancel order" };
    }
};