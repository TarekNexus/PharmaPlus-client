const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const ProfileService = {
  getCurrentUser,
};

export async function getCurrentUser() {
  try {
    const response = await fetch(`${BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add Authorization if needed, e.g.
        // "Authorization": `Bearer ${token}`,
      },
      credentials: "include", // send cookies if your backend uses them
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user");
    }

    const data = await response.json();
    return data; // { success, message, data: {...} }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
}
