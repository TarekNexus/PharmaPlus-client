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
        backgroundImage: `url('/imgs/hero.avif')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 rounded-none lg:rounded-3xl bg-black opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      ></motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-6xl px-4"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl font-neue sm:text-4xl font-satoshi md:text-5xl lg:text-[52px] font-medium text-white leading-snug"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
           Review Your Cart,  Checkout with Confidence
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl font-satoshi lg:text-[22px] text-gray-200 mt-2 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
       Double-check your selected medicines and health products <br />
          PharmaPlus ensures safe delivery and hassle-free checkout — fast and reliable.
        </motion.p>

        <Link href="/shop" className="">
      <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF833B] text-white rounded-full hover:bg-[#e67533] transition-colors">
        <ArrowLeft size={20} />
        <span>Back to Shop</span>
      </button>
    </Link>

      </motion.div>
    </section>
  );
};

export default Hero;
