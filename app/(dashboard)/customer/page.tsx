"use client";

import { useEffect, useState } from "react";
import { customerService } from "@/services/customer.service";
import { Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

interface Medicine {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  medicine: Medicine;
}

interface Order {
  id: string;
  status: string;
  createdAt: string;
  totalPrice: number;
  items: OrderItem[];
  address: string;
  name: string;
  phone: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingOrderId, setCancelingOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const brandColor = "#FF833B";

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await customerService.getMyOrders();
      if (res.success) setOrders(res.data);
      else console.error("Failed to fetch orders");
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    setCancelingOrderId(orderId);
    const res = await customerService.cancelOrder(orderId);
    setCancelingOrderId(null);

    if (res.success) {
      toast.success("Order canceled successfully");
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "CANCELED" } : order
        )
      );
    } else toast.error("Failed to cancel order");
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "PLACED":
        return "bg-[#C2F8CB] text-gray-800";
      case "PROCESSING":
        return "bg-yellow-200 text-yellow-800";
      case "SHIPPED":
        return "bg-blue-200 text-blue-800";
      case "DELIVERED":
        return "bg-green-200 text-green-800";
      case "CANCELED":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-10 h-10" style={{ color: brandColor }} />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className=" px-4 py-4">
      <h1 className="lg:text-3xl md:lg:text-3xl text-2xl font-satoshi font-bold text-[#FF833B] mb-4">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <div className="flex-1">
              <h2 className="font-semibold text-lg">
                Order ID: {order.id.slice(0, 8)}...
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>
              <span
                className={`inline-block mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setSelectedOrder(order)}
                className="px-4 py-2 rounded text-white font-medium transition"
                style={{ backgroundColor: brandColor }}
              >
                View Details
              </button>

              {(order.status === "PLACED" || order.status === "PROCESSING") && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  disabled={cancelingOrderId === order.id}
                  className="px-4 py-2 rounded text-white font-medium transition disabled:opacity-50"
                  style={{ backgroundColor: "#FF4D00" }}
                >
                  {cancelingOrderId === order.id ? "Canceling..." : "Cancel Order"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center md:text-left" style={{ color: brandColor }}>
              Order Details
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Order ID:</span> {selectedOrder.id}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Placed on:</span>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Status:</span>{" "}
              <span className={`px-2 py-1 rounded ${getStatusBadgeColor(selectedOrder.status)}`}>
                {selectedOrder.status}
              </span>
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Items:</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-2">
                    {item.medicine.image && (
                      <div className="w-16 h-16 relative rounded overflow-hidden shrink-0">
                        <Image
                          src={item.medicine.image}
                          alt={item.medicine.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.medicine.name}</p>
                      <p className="text-gray-500 text-sm truncate">
                        Quantity: {item.quantity} | Price: ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t pt-3 text-sm sm:text-base">
              <p className="font-semibold">Total: ${selectedOrder.totalPrice}</p>
              <p className="text-gray-600">
                Shipping: {selectedOrder.address} | {selectedOrder.name} | {selectedOrder.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
