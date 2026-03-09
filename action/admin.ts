"use server";

import { adminUserService } from "@/services/admin.service";
import { cookies } from "next/headers";



export const adminAction = {
async getAdminData() {
     const cookieStore = await cookies();
    try {
        const res = await adminUserService.getAllUsers(cookieStore)
        return  res
    }
    catch (err) {
        console.error(err);
        return { success: false, message: "Failed to fetch admin data" };
    }   

}
}