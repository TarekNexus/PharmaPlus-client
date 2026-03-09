/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const ProfileService = {
  getCurrentUser,
};

export async function getCurrentUser(cookieStore: any) {
  try {
    const response = await fetch(`${BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
  
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user");
    }

    const data = await response.json();
    return data; // { success, message, data: {...} }
 
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
}
