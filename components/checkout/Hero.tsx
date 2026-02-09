"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative rounded-none lg:rounded-3xl lg:w-11/12 lg:mb-14 mb-6 mx-auto top-0 lg:top-6 h-100.75 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/imgs/check.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 rounded-none lg:rounded-3xl bg-black opacity-25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      ></motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl px-4"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl font-neue sm:text-4xl font-satoshi md:text-5xl lg:text-[52px]  font-medium text-white leading-snug"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
            Almost There! Complete Your Order
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl font-satoshi mb-3 lg:text-[22px] text-gray-200 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          Review your delivery details and finalize your PharmaPlus order. <br />
          Fast, safe, and right to your door.
        </motion.p>
        
        

    <Link href="/cart" className="">
      <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF833B] text-white rounded-full hover:bg-[#e67533] transition-colors">
        <ArrowLeft size={20} />
        <span>Back to Cart</span>
      </button>
    </Link>


 

      </motion.div>
    </section>
  );
};

export default Hero;
