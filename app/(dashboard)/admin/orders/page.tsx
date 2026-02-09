"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import Loader from "@/components/dashboard/Loader";

// Types
type Medicine = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  medicine: Medicine;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  user: User;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // loader state

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true); // show loader
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to fetch orders ❌");
    } finally {
      setLoading(false); // hide loader
    }
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    setUpdatingId(orderId);
    const updatedOrder = await orderService.updateOrderStatus(orderId, status);
    setUpdatingId(null);

    if (updatedOrder) {
      toast.success("Order updated successfully");
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status: updatedOrder.status,
                name: updatedOrder.name,
                phone: updatedOrder.phone,
                address: updatedOrder.address,
              }
            : o,
        ),
      );
    } else {
      toast.error("Failed to update order ❌");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="lg:text-3xl md:lg:text-3xl text-2xl font-satoshi font-bold text-[#FF833B] mb-4">
        Orders Management
      </h1>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Loader></Loader>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-lg">
          <Table className="w-full whitespace-nowrap border">
            <TableHeader>
              <TableRow className="bg-[#FF833B] text-white">
                <TableHead className="text-white  font-satoshi ">
                  Order NO
                </TableHead>
                <TableHead className="text-white font-satoshi">
                  Order ID
                </TableHead>
                <TableHead className="text-white font-satoshi">Name</TableHead>
                <TableHead className="text-white font-satoshi">Phone</TableHead>
                <TableHead className="text-white font-satoshi">
                  Address
                </TableHead>
                <TableHead className="text-white font-satoshi">
                  Status
                </TableHead>
                <TableHead className="text-white font-satoshi">
                  Created At
                </TableHead>
                <TableHead className="text-white font-satoshi">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell className="font-satoshi">{index + 1}</TableCell>
                  <TableCell className="font-satoshi">{order.id}</TableCell>
                  <TableCell className="font-satoshi">{order.name}</TableCell>
                  <TableCell className="font-satoshi">{order.phone}</TableCell>
                  <TableCell
                    className="truncate max-w-37.5 font-satoshi"
                    title={order.address}
                  >
                    {order.address}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(val) => handleStatusChange(order.id, val)}
                      disabled={updatingId === order.id}
                    >
                      <SelectTrigger className="w-32 sm:w-36 font-satoshi">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PLACED">PLACED</SelectItem>
                        <SelectItem value="PROCESSING">PROCESSING</SelectItem>
                        <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                        <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                        <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="font-satoshi">
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      className="bg-[#FF833B] font-satoshi"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 p-4  flex items-start sm:items-center justify-center bg-black/50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 w-[85vw] sm:w-150 max-h-[90vh]  shadow-lg flex flex-col">
            {/* Header */}
            <div className="px-4 sm:px-6 py-2 flex justify-end items-center  dark:border-gray-700 rounded-t-3xl">
              <button
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl leading-none"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
              {/* Order Info */}
              <h2 className="text-lg sm:text-xl text-center font-semibold font-satoshi">
                Order Details
              </h2>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium font-satoshi">Status: </span>
                  {selectedOrder.status}
                </p>
                <p>
                  <span className="font-medium font-satoshi">ID: </span>
                  {selectedOrder.id}
                </p>
                <p>
                  <span className="font-medium font-satoshi">OrderAt: </span>
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Customer Info */}
              <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="font-semibold text-base font-satoshi">
                  Customer Info
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium font-satoshi">Name:</span>{" "}
                    {selectedOrder.name}
                  </p>
                  <p>
                    <span className="font-medium font-satoshi">Phone:</span>{" "}
                    {selectedOrder.phone}
                  </p>
                  <p>
                    <span className="font-medium font-satoshi">Address:</span>{" "}
                    {selectedOrder.address}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="font-semibold text-base font-satoshi">
                  Items ({selectedOrder.items.length})
                </h3>
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="border mt-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className="shrink-0 w-6 h-6 rounded-full font-satoshi bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs font-medium flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium font-satoshi">
                          {item.medicine.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {item.medicine.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm">
                      <div className="flex gap-4 text-gray-600 font-satoshi dark:text-gray-400">
                        <span>
                          Qty: <strong>{item.quantity}</strong>
                        </span>
                        <span>
                          @ <strong>${item.price.toFixed(2)}</strong>
                        </span>
                      </div>
                      <span className="font-semibold font-satoshi text-blue-600 dark:text-blue-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="border-t-2 font-satoshi border-gray-300 dark:border-gray-600 pt-3 flex justify-between items-center font-bold text-base sm:text-lg">
                  <span>Total Amount:</span>
                  <span className="text-blue-600 dark:text-blue-400 text-lg sm:text-xl font-satoshi">
                    $
                    {selectedOrder.items
                      .reduce((sum, i) => sum + i.price * i.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-4 font-satoshi border-t border-gray-200 dark:border-gray-700 flex justify-end bg-white dark:bg-gray-900 shrink-0">
              <Button
                variant="outline"
                onClick={() => setSelectedOrder(null)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
