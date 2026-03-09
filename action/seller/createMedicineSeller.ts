"use server";






import { MedicineInput, sellerService } from "@/services/seller.service";
import { cookies } from "next/headers";

export  const createMedicineSeller = async (medicineData:MedicineInput) => {
    const cookieStore = await cookies();
    try {
      const res = await sellerService. createMedicineSeller( cookieStore, medicineData);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to create medicine" };
    }
};