"use server";


import { categoryService } from "@/services/category.service";
import { cookies } from "next/headers";

export  const getAllCategory = async () => {
    const cookieStore = await cookies();
    try {
      const res = await categoryService.getAllCategory(cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch admin data" };
    }
};