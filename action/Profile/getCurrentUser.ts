"use server";






import { ProfileService } from "@/services/profile.service";
import { cookies } from "next/headers";

export  const getCurrentUser = async () => {
    const cookieStore = await cookies();
    try {
      const res = await ProfileService.getCurrentUser( cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch current user" };
    }
};