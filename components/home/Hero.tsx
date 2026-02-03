"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative h-[90vh] flex items-center justify-center text-center py-2 overflow-hidden lg:rounded-[25px] md:max-w-[92%] mx-auto lg:my-6 -mt-1  shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
      {/* Background Image */}
      <Image
        src="/imgs/banner.webp"
        alt="Pharmacy banner"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-1" />

      {/* Animated Content */}
      <motion.div
        className="relative z-10 max-w-3xl px-6 text-white"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {/* Small Badge */}
        <motion.div variants={fadeUp} className="mb-4 font-satoshi">
          <span className="bg-white/35 text-sm px-4 py-1 rounded-xl backdrop-blur-md shadow-[0_2px_6.6px_0_rgba(255,131,59,0.4)]">
            Your Trusted Online Pharmacy
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight mb-4 font-neue-haas-grotesk-display-pro"
        >
Wellness You Can Rely On
<br />
<span className="text-white/90">with Pharma Plus</span>


        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-lg text-white/80 mb-8 font-satoshi"
        >
             Order genuine medicines, track your orders, and <br />
          manage prescriptions easily with PharmaPlus.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center font-satoshi"
        >
          <Link href="/shop">
            <button className="bg-[#FF833B] hover:bg-white hover:text-black transition-all ease-in-out duration-300 text-white font-medium px-8.75 py-3 rounded-2xl  cursor-pointer">
             Shop Now
            </button>
          </Link>
          <Link href="/contact">
            <button className="border border-[#FF833B] text-white hover:bg-[#FF833B]/10 font-medium px-8.75 py-3 rounded-2xl transition cursor-pointer">
               Contact Us
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
