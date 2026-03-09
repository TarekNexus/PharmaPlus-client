"use server";






import {  sellerService } from "@/services/seller.service";
import { cookies } from "next/headers";

export  const deleteMedicineSeller = async (id: string) => {
    const cookieStore = await cookies();
    try {
      const res = await sellerService.deleteMedicineSeller( id, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to delete medicine" };
    }
};