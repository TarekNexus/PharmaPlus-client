"use client";
import FaqSection from "@/components/home/FAQSection";
import Features from "@/components/home/Features";
import Hero from "@/components/order/Hero";
import {  ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const updateLocalStorage = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const increaseQuantity = (id: string) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateLocalStorage(updated);
    toast.success("Quantity increased ");
  };

  const decreaseQuantity = (id: string) => {
    const updated = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    updateLocalStorage(updated);
    toast.success("Quantity decreased ");
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateLocalStorage(updated);
    toast.error("Item removed ");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 100;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white">
      <Hero />

      {/* Header */}
      <div className="text-center mb-12 px-4 sm:px-6 md:px-8">
        <h1 className="text-4xl font-satoshi sm:text-5xl lg:text-5xl font-bold mb-4 text-[#FF833B]">
          Your Pharmacy Cart
        </h1>
        <p className="text-gray-800 font-satoshi text-base sm:text-lg md:text-xl">
          Review your selected medicines and health products before checkout.
        </p>
      </div>

      <div className="w-full md:w-9/12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-0">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Selected Items */}
          <div className="bg-[#FFE6D9] rounded-lg px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          
            <span className="text-[#FF833B] text-sm sm:text-base">
              {cartItems.length} items selected
            </span>
          </div>

          {/* Empty Cart */}
          {cartItems.length === 0 && (
            <div className="bg-[#FFE6D9] rounded-lg px-6 py-16 text-center">
              <ShoppingCart className="mx-auto mb-4 text-[#FF833B]" size={48} />
              <p className="text-gray-600 text-sm sm:text-base">
                Your cart is empty.{" "}
                <Link href="/shop" className="text-[#FF833B] underline">
                  Browse medicines
                </Link>
              </p>
            </div>
          )}

          {/* Cart Items List */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFE6D9] rounded-lg p-4 flex flex-col sm:flex-row md:items-center  justify-between gap-4"
            >
              <div className="flex items-center sm:items-center gap-4 w-full sm:w-auto">
               
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#FF833B]">
                    {item.title}
                  </h3>
                  <p className="text-gray-800 text-sm sm:text-base">
                    ৳ {item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex  justify-between items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                <div className="flex items-center gap-2">
                    <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFB88C] flex items-center justify-center hover:bg-[#FF9E4F] transition"
                >
                  <Minus size={16} />
                </button>

                <span className="text-gray-800 text-sm sm:text-base">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFB88C] flex items-center justify-center hover:bg-[#FF9E4F] transition"
                >
                  <Plus size={16} />
                </button>
                </div>

                <Trash2
                  onClick={() => removeItem(item.id)}
                  className="cursor-pointer text-[#FF833B] hover:text-[#e67533] transition"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#FFE6D9] rounded-lg p-6 sticky top-24">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-[#FF833B]">
              Order Summary
            </h2>

            <div className="space-y-3 sm:space-y-4 mb-6 text-gray-800 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>৳ {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>৳ {deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6 border-[#FFB88C]">
              <div className="flex justify-between text-base sm:text-lg lg:text-xl font-semibold text-[#FF833B]">
                <span>TOTAL</span>
                <span>৳ {total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout">
              <button className="w-full bg-linear-to-r from-[#FF833B] to-[#FF9E4F] text-white py-3 sm:py-4 rounded-lg hover:scale-105 transition text-sm sm:text-base">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Features />
      <FaqSection />
    </div>
  );
}
