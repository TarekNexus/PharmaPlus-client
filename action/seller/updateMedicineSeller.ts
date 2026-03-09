"use server";






import { MedicineInput, sellerService } from "@/services/seller.service";
import { cookies } from "next/headers";

export  const updateMedicineSeller = async (id: string, medicineData: MedicineInput) => {
    const cookieStore = await cookies();
    try {
      const res = await sellerService.updateMedicineSeller(  id, medicineData, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to update medicine" };
    }
};