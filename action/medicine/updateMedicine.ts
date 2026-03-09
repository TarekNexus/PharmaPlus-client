"use server";




import { MedicineInput, medicineService } from "@/services/medicine.service";
import { cookies } from "next/headers";

export  const updateMedicine = async (id: string, medicineData: MedicineInput) => {
    const cookieStore = await cookies();
    try {
      const res = await medicineService.updateMedicine( id, medicineData, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to update medicine" };
    }
};