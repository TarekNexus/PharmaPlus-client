
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const customerService = {
  // 🔹 Get customer profile
 async getProfile() {
    try {
      const res = await fetch(`${baseUrl}/api/customer/profile`, {
        credentials: "include",
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },

  // 🔹 Update customer profile (PATCH)
  async updateProfile(profileData: { name?: string; email?: string; image?: string }) {
    try {
      const res = await fetch(`${baseUrl}/api/customer/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profileData),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },

  // 🔹 Get all orders of the customer
  async getMyOrders() {
    try {
      const res = await fetch(`${baseUrl}/api/customer/orders`, {
        credentials: "include",
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },

  // 🔹 Cancel an order
  async cancelOrder(orderId: string) {
    try {
      const res = await fetch(`${baseUrl}/api/customer/orders/${orderId}/cancel`, {
        method: "PATCH", // or "POST" depending on your backend
        credentials: "include",
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },
};
