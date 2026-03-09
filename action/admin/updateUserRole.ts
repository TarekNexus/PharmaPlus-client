"use server";

import { adminUserService } from "@/services/admin.service";
import { cookies } from "next/headers";

export  const updateUserRole = async (id: string, role: string) => {
    const cookieStore = await cookies();
    try {
      const res = await adminUserService.updateUserRole(id, role, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch admin data" };
    }
};