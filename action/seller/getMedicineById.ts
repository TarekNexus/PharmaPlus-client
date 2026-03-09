"use server";






import { sellerService } from "@/services/seller.service";
import { cookies } from "next/headers";

export  const getMedicineById = async (id: string) => {
    const cookieStore = await cookies();
    try {
      const res = await sellerService. getMedicineById( cookieStore, id);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch medicine" };
    }
};