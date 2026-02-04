import {env} from "@/env";

const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;
export const medicineService = {
  getAllMedicines: async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/medicine/`, {
        cache: 'no-store'
      });
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error fetching medicines:", error);
      return { success: false, message: "Failed to fetch medicines", data: [] };
    }
  },

  getAllCategories: async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/medicine/categories/all`, {
          cache: 'no-store'
      });
      const result = await response.json();
      return result.data || []; // <-- return only the array
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  getMedicineById: async (id: string) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/medicine/${id}`, {
        cache: "no-store"
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }
      console.log(result.data);
      return result.data; // ✅ return ONLY medicine object
    } catch (error) {
      console.error(`Error fetching medicine with id ${id}:`, error);
      return null;
    }
  },
};
