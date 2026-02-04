"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Highlights() {
  return (
    <div className="pt-10 max-w-11/12 mx-auto px-5">
      <motion.h1
        className="text-[20px] md:text-[25px] lg:text-[45px] font-neue-haas-grotesk-display-pro font-semibold text-[#211F1A]"
        initial={{ opacity: 0, y: 30 }}      // start slightly below and invisible
        animate={{ opacity: 1, y: 0 }}       // fade up into place
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        PharmaPlus makes it easy to discover and order the most popular medicines online, providing fast, reliable access to health and wellness products for everyone, anytime, anywhere.
      </motion.h1>
    </div>
  );
}
