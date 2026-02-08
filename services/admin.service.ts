import { env } from "@/env";

const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;

export const adminUserService = {

  getAllUsers: async () => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/admin/users`,
        {
          cache: "no-store",
          credentials: "include", 
        }
      );

      const result = await response.json();
      return result; 
    } catch (error) {
      console.error("Error fetching users:", error);
      return { success: false, message: "Failed to fetch users", data: [] };
    }
  },

  
  getUserById: async (id: string) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/admin/users/${id}`,
        {
          cache: "no-store",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data; 
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      return null;
    }
  },

 
  updateUserRole: async (id: string, role: string) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/admin/users/${id}`,
        {
          method: "PATCH", // or PUT (check backend)
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ role }),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error updating role:", error);
      return { success: false, message: "Failed to update role" };
    }
  },


  banUser: async (id: string) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/admin/users/ban/${id}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error banning user:", error);
      return { success: false, message: "Failed to ban user" };
    }
  },

 
 toggleBanUser: async (id: string) => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_API_URL}/api/admin/users/ban/${id}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Toggle ban error:", error);
    return { success: false };
  }
},

};
