"use server";


import { ReviewPayload, reviewService } from "@/services/review.service";
import { cookies } from "next/headers";

export  const addReview = async (data: ReviewPayload) => {
    const cookieStore = await cookies();
    try {
      const res = await reviewService.addReview( data, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to add review" };
    }
};