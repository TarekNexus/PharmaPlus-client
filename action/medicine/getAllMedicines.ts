"use server";




import { medicineService } from "@/services/medicine.service";
import { cookies } from "next/headers";

export  const getAllMedicines = async () => {
    const cookieStore = await cookies();
    try {
      const res = await medicineService.getAllMedicines( cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch all medicines" };
    }
};