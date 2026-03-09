/* eslint-disable @typescript-eslint/no-explicit-any */

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const customerService = {
  // 🔹 Get customer profile
 async getProfile(cookieStore: any) {
    try {
      const res = await fetch(`${baseUrl}/api/customer/profile`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },

  // 🔹 Update customer profile (PATCH)
  async updateProfile(profileData: { name?: string; email?: string; image?: string }, cookieStore: any) {
    try {
      const res = await fetch(`${baseUrl}/api/customer/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString()
        },
        body: JSON.stringify(profileData),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },

  // 🔹 Get all orders of the customer
  async getMyOrders(cookieStore: any) {
    try {
      const res = await fetch(`${baseUrl}/api/customer/orders`, {
          headers: {
          Cookie: cookieStore.toString(),
        },
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },

  // 🔹 Cancel an order
  async cancelOrder(orderId: string, cookieStore: any) {
    try {
      const res = await fetch(`${baseUrl}/api/customer/orders/${orderId}/cancel`, {
        method: "PATCH", // or "POST" depending on your backend
        headers: {
          Cookie: cookieStore.toString(),
        },
       
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },
};
