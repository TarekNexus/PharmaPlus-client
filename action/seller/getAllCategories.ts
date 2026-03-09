"use server";


import { sellerService } from "@/services/seller.service";
import { cookies } from "next/headers";

export  const getAllCategories = async () => {
    const cookieStore = await cookies();
    try {
      const res = await sellerService.getAllCategories( cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch all categories" };
    }
};