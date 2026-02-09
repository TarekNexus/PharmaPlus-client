
"use client";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import { orderService } from "@/services/order.service"; // 🔹 import service
import Image from "next/image";

import Hero from "@/components/checkout/Hero";
import { Loader2 } from "lucide-react";

interface CartItem {
  id: string;
  medicineId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  notes?: string;
}

interface FormData {
  name: string;
  contact: string;
  road: string;
  house: string;
  notes: string;
}

export default function Order() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    road: "",
    house: "",
    notes: "",
  });

  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const deliveryFee = 100;
const [isLoading, setIsLoading] = useState(false);
  // Load order items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart) as CartItem[];
        setOrderItems(parsed);
      } catch (err) {
        console.error("Failed to parse cart from localStorage:", err);
      }
    }
  }, []);

  // Calculate totals
  const subtotal = orderItems.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0),
    0,
  );
  const total = subtotal + deliveryFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handlePlaceOrder = async () => {
  if (orderItems.length === 0) {
    toast.error("Your cart is empty!");
    return;
  }
  if (!formData.name || !formData.contact || !formData.road || !formData.house) {
    toast.error("Please fill all required fields!");
    return;
  }

  setIsLoading(true); // start loading
  try {
    const itemsForApi = orderItems.map((item) => ({
      medicineId: item.medicineId,
      quantity: item.quantity,
    }));

    const address = `${formData.road}, ${formData.house}`;
    const orderData = {
      items: itemsForApi,
      address,
      name: formData.name,
      phone: formData.contact,
      notes: formData.notes,
    };

    await orderService.placeOrder(orderData);

    toast.success("Your PharmaPlus order has been placed!");
    localStorage.removeItem("cart");
    setOrderItems([]);
    setFormData({ name: "", contact: "", road: "", house: "", notes: "" });
  } catch (err) {
    console.error(err);
    toast.error("Failed to place order. Please try again.");
  } finally {
    setIsLoading(false); // stop loading
  }
};

  return (
 <div className=" bg-white">
  {/* Back Button */}
      <Toaster position="top-right" reverseOrder={false} />
<Hero></Hero>

  {/* Header */}
  <div className="text-center mb-12 px-4">
    
    <h1 className="text-3xl font-satoshi sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-4 text-[#FF833B]">
      Delivery & Billing
    </h1>
    <p className="text-gray-800 font-satoshi text-base sm:text-lg md:text-lg">
      Fill your details to complete your PharmaPlus order.
    </p>
  </div>

  <div className="md:w-9/12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 mb-4">
    {/* Billing Form */}
    <div className="lg:col-span-2">
      <div className="bg-[#FFF2EB] rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-[#FF833B]">
          Billing Details <span className="text-base font-normal text-gray-700">(Cash on Delivery)</span>
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white border-2 border-[#FF833B] rounded-lg focus:outline-none focus:border-[#FF833B] transition-colors text-black placeholder-gray-600"
          />
          <input
            type="tel"
            name="contact"
            placeholder="Phone Number"
            value={formData.contact}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white border-2 border-[#FF833B] rounded-lg focus:outline-none focus:border-[#FF833B] transition-colors text-black placeholder-gray-600"
          />

          <h3 className="text-lg font-semibold mt-6 mb-3 text-[#FF833B]">Delivery Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="road"
              placeholder="Road / Street"
              value={formData.road}
              onChange={handleInputChange}
              className="px-4 py-3 bg-white border-2 border-[#FF833B] rounded-lg focus:outline-none focus:border-[#FF833B] transition-colors text-black placeholder-gray-600"
            />
            <input
              type="text"
              name="house"
              placeholder="House / Flat No."
              value={formData.house}
              onChange={handleInputChange}
              className="px-4 py-3 bg-white border-2 border-[#FF833B] rounded-lg focus:outline-none focus:border-[#FF833B] transition-colors text-black placeholder-gray-600"
            />
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-[#FF833B]">Order Notes (Optional)</h3>
          <textarea
            name="notes"
            placeholder="Notes about your order..."
            value={formData.notes}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-3 bg-white border-2 border-[#FF833B] rounded-lg focus:outline-none focus:border-[#FF833B] transition-colors text-black placeholder-gray-600 resize-none"
          />

          <button
  onClick={handlePlaceOrder}
  disabled={isLoading} // prevent double clicks
  className={`w-full bg-linear-to-r from-[#FF833B] to-[#FF9E4F] text-white font-semibold py-4 rounded-lg hover:scale-105 transition transform shadow-lg mt-6 flex items-center justify-center gap-2 ${
    isLoading ? "cursor-not-allowed opacity-70" : ""
  }`}
>
  {isLoading ? (
    <>
      <Loader2 className="animate-spin w-5 h-5" />
      Placing Order...
    </>
  ) : (
    "Place Order"
  )}
</button>

        </div>
      </div>
    </div>

    {/* Order Summary */}
    <div className="lg:col-span-1 lg:sticky lg:top-24">
      <div className="bg-[#FFF2EB] rounded-lg p-6 sm:p-6">
        <h2 className="text-2xl font-semibold mb-6 text-[#FF833B]">Order Summary</h2>

        <div className="space-y-4 mb-6">
          {orderItems.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          ) : (
            orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 pb-4 border-b border-[#FFB88C]"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  {item.image.startsWith("http") ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-3xl">{item.image}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black text-sm sm:text-base md:text-base">{item.title}</h3>
                  <p className="text-gray-600 text-sm">৳ {item.price.toFixed(2)}</p>
                  <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="font-semibold text-black text-sm sm:text-base md:text-base">
                  ৳ {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-black text-sm sm:text-base md:text-base">
            <span>Delivery Fee</span>
            <span>৳ {deliveryFee.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t border-[#FFB88C] pt-4">
          <div className="flex justify-between text-xl font-semibold">
            <span>TOTAL</span>
            <span>৳ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
