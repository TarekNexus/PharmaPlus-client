"use server";




import { MedicineInput, medicineService } from "@/services/medicine.service";
import { cookies } from "next/headers";

export  const createMedicine = async (medicineData: MedicineInput) => {
    const cookieStore = await cookies();
    try {
      const res = await medicineService. createMedicine( medicineData, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to create medicine" };
    }
};