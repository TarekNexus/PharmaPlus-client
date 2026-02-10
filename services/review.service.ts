import { env } from "@/env";

const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;

export interface ReviewPayload {
  medicineId: string;
  rating: number;
  comment: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
}

export const reviewService = {
  addReview: async (data: ReviewPayload) => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/customer/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Failed to add review");
    return result.data;
  },

  getReviewsByMedicine: async (medicineId: string): Promise<Review[]> => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/customer/reviews/${medicineId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store",
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message || "Failed to fetch reviews");
    return result.data || [];
  },
};
