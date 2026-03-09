"use server";

import { adminUserService } from "@/services/admin.service";
import { cookies } from "next/headers";

export  const getUserById = async (id: string) => {
    const cookieStore = await cookies();
    try {
      const res = await adminUserService.  getUserById(id, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch user data" };
    }
};