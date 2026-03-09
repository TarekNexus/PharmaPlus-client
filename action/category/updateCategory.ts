"use server";


import { categoryService } from "@/services/category.service";
import { cookies } from "next/headers";

export  const updateCategory = async (id: string, name: string) => {
    const cookieStore = await cookies();
    try {
      const res = await categoryService.updateCategory(id, name, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to update category" };
    }
};