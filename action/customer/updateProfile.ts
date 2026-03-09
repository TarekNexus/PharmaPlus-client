"use server";



import { customerService } from "@/services/customer.service";
import { cookies } from "next/headers";

export  const updateProfile = async (profileData: { name?: string; email?: string; image?: string }) => {
    const cookieStore = await cookies();
    try {
      const res = await customerService.updateProfile(profileData, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch admin data" };
    }
};