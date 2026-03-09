/* eslint-disable @typescript-eslint/no-explicit-any */



const NEXT_PUBLIC_API_URL =  process.env.NEXT_PUBLIC_API_URL 

// Types
export type MedicineInput = {
  name: string;
  category: {
    id: string;
  };
  price: string|number;
  stock: string | number;
  description: string;
  image: string;
  Manufacturer?: string;
};

export const medicineService = {
  getAllMedicines: async (cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/medicine/`, {
        cache: "no-store",
        headers: {
          
          Cookie: cookieStore.toString(),
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching medicines:", error);
      return { success: false, message: "Failed to fetch medicines", data: [] };
    }
  },

  getAllCategories: async (cookieStore: any) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/medicine/categories/all`,
        {
          cache: "no-store",
          headers: {
            
            Cookie: cookieStore.toString(),
          },
        }
      );
      const result = await response.json();
      return result.data || []; // <-- return only the array
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  getMedicineById: async (id: string, cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/medicine/${id}`, {
        cache: "no-store",
         headers: {
            
            Cookie: cookieStore.toString(),
          },
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
  createMedicine: async (medicineData: MedicineInput, cookieStore: any) => {
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
          Cookie: cookieStore.toString(),
        },
       
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
updateMedicine: async (id: string, medicineData: MedicineInput, cookieStore: any) => {
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
      headers: { "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
       },
       // 
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
  deleteMedicine: async (id: string, cookieStore: any) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/medicine/${id}`,
        {
          method: "DELETE",
           headers: {
            
            Cookie: cookieStore.toString(),
          },
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