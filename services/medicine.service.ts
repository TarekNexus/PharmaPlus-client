import { env } from "@/env";

const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;

// Types
export type MedicineInput = {
  name: string;
  category: {
    id: string;
  };
  price: number;
  stock: number;
  description: string;
  image: string;
  Manufacturer?: string;
};

export const medicineService = {
  getAllMedicines: async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/medicine/`, {
        cache: "no-store",
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
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/medicine/categories/all`,
        {
          cache: "no-store",
        }
      );
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
        cache: "no-store",
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

  // Create new medicine
  createMedicine: async (medicineData: MedicineInput) => {
    try {
      // Transform data to match API expectations
      const payload = {
        name: medicineData.name,
        categoryId: medicineData.category.id,
        price: medicineData.price,
        stock: medicineData.stock,
        description: medicineData.description,
        image: medicineData.image,
        Manufacturer: medicineData.Manufacturer || null,
      };

      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/seller/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create medicine");
      }

      return result;
    } catch (error) {
      console.error("Error creating medicine:", error);
      throw error;
    }
  },

  // Update medicine
updateMedicine: async (id: string, medicineData: MedicineInput) => {
  try {
    const payload = {
      name: medicineData.name,
      categoryId: medicineData.category.id,
      price: medicineData.price,
      stock: medicineData.stock,
      description: medicineData.description,
      image: medicineData.image || null,
      Manufacturer: medicineData.Manufacturer || null,
    };

    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/medicine/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",  // 
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Update failed:", result);
      throw new Error(result.message || "Failed to update medicine");
    }

    console.log("Medicine updated successfully:", result);
    return result;
  } catch (error) {
    console.error(`Error updating medicine with id ${id}:`, error);
    throw error;
  }
},



  // Delete medicine
  deleteMedicine: async (id: string) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/seller/medicines/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete medicine");
      }

      return result;
    } catch (error) {
      console.error(`Error deleting medicine with id ${id}:`, error);
      throw error;
    }
  },
};