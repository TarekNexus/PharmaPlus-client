"use server";


import {  reviewService } from "@/services/review.service";
import { cookies } from "next/headers";

export  const  getReviewsByMedicine = async (medicineId: string) => {
    const cookieStore = await cookies();
    try {
      const res = await reviewService.getReviewsByMedicine( cookieStore, medicineId);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch reviews" };
    }
};