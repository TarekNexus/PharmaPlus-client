"use server";

import { adminUserService } from "@/services/admin.service";
import { cookies } from "next/headers";

export  const banUser = async (id: string) => {
    const cookieStore = await cookies();
    try {
      const res = await adminUserService.banUser(id, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to ban user" };
    }
};