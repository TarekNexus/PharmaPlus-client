"use server";

import { adminUserService } from "@/services/admin.service";
import { cookies } from "next/headers";

export  const getAllUsers = async () => {
    const cookieStore = await cookies();
    try {
      const res = await adminUserService.getAllUsers(cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch all users" };
    }
};