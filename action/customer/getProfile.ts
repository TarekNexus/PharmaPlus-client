"use server";



import { customerService } from "@/services/customer.service";
import { cookies } from "next/headers";

export  const getProfile = async () => {
    const cookieStore = await cookies();
    try {
      const res = await customerService.getProfile( cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch admin data" };
    }
};