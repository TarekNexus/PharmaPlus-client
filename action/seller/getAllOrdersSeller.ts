"use server";






import { sellerService } from "@/services/seller.service";
import { cookies } from "next/headers";

export  const getAllOrdersSeller = async () => {
    const cookieStore = await cookies();
    try {
      const res = await sellerService. getAllOrdersSeller( cookieStore,);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch orders" };
    }
};