"use server";


import { categoryService } from "@/services/category.service";
import { cookies } from "next/headers";

export  const createCategory = async (name: string) => {
    const cookieStore = await cookies();
    try {
      const res = await categoryService.createCategory(name, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to create category" };
    }
};