"use server";





import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";

export  const  placeOrder = async (orderData:{
    items: { medicineId: string; quantity: number }[];
    address: string;
    name: string;
    phone: string;
  }) => {
    const cookieStore = await cookies();
    try {
      const res = await orderService. placeOrder( orderData, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to place order" };
    }
};