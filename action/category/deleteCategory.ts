"use server";


import { categoryService } from "@/services/category.service";
import { cookies } from "next/headers";

export  const deleteCategory = async (id: string) => {
    const cookieStore = await cookies();
    try {
      const res = await categoryService.deleteCategory(id, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to delete category" };
    }
};