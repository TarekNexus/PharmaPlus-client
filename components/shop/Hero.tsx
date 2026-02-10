"use client";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative rounded-none lg:rounded-3xl lg:w-11/12 lg:mb-14 mb-6 mx-auto top-0 lg:top-6 h-100.75 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/medicines/ShopHero.avif')`,
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
        className="relative z-10 text-center max-w-6xl px-4"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl  md:text-5xl lg:text-[52px] font-satoshi font-medium text-white leading-snug"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          Your Health, Delivered to Your Door
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-[22px] font-satoshi text-gray-200 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          PharmaPlus makes buying medicines and wellness products <br /> 
          simple, safe, and convenient — anytime, anywhere.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
