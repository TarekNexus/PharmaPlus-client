import { env } from "@/env";

const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;

export const orderService = {
  // Get all orders
  getAllOrders: async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/orders/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Failed to fetch orders");

      return result.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: string) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Failed to update order");

      return result.data;
    } catch (error) {
      console.error("Error updating order:", error);
      return null;
    }
  },



  placeOrder: async (orderData: {
    items: { medicineId: string; quantity: number }[];
    address: string;
    name: string;
    phone: string;
  }) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/customer/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
        credentials: "include",
        
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to place order");
      }

      return result; // success response
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  },
};
