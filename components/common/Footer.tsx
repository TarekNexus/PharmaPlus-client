"use client";
import Marquee from "react-fast-marquee";
import {
  ArrowUp,
} from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <div
      className="bg-cover md:w-11/12 mx-auto  bg-[#211F1A] md:rounded-3xl md:mb-2  bg-center py-16 px-0 md:px-2"
    >
      <footer className="text-white">
        <div className="lg:px-8 md:px-7 px-4 mx-auto flex flex-col justify-around gap-2 text-sm">
          {/* Logo Top */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Image
              src="/imgs/pharmapluse.png"
              alt="Pharma Plus"
              width={180}
              height={100}
              className="mb-3"
            />

            <p className="text-base font-inter text-[#FFFFFF] text-center md:text-left">Your trusted partner for quality healthcare — <br className="hidden md:block" /> Pharma Plus delivers authentic medical supplies to your doorstep.</p>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6 justify-between items-center md:items-start border-t border-[#FFFFFF33] gap-8 md:gap-0">
            {/* Left Section - Contact */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <div className="flex md:items-center gap-3 justify-start">
                <div className=" w-8.5 h-8.5 border-2 border-[#F1BB78] flex items-center justify-center rounded-[10px]">
                  <FaLocationDot className="w-4 h-4 text-[#FF833B]" />
                </div>
                <span className="md:text-lg text-base  font-inter  text-[#F7F2E9]">
                 123/4 Muhammadpur, Dhaka 1207
                </span>
              </div>

              <div className="flex items-center gap-3 justify-start">
                <div className=" w-8.5 border-2 border-[#F1BB78] h-8.5 flex items-center justify-center rounded-[10px]">
                  <IoMdMail className="w-4 h-4 text-[#FF833B]" />
                </div>
                <span className="text-lg font-inter  text-[#F7F2E9]">
                  support@pharmaplus.com
                </span>
              </div>

              <div className="flex items-center gap-3 justify-start">
                <div className=" w-8.5 border-2 border-[#F1BB78] h-8.5 flex items-center justify-center rounded-[10px]">
                  <FaPhone className="w-4 h-4 text-[#FF833B]" />
                </div>
                <span className="text-lg font-inter  text-[#F7F2E9]">+880 1234 567890</span>
              </div>
            </div>

            {/* Center Section - Title, Quote, Social */}
            <div className="flex flex-col items-center text-center px-4 sm:px-6 md:px-0">
              {/* Title */}
              <h2 className="text-[22px] sm:text-[27px] md:text-[30px] font-bold font-gilroy-regular mb-4">
                Subscribe to Health Updates
              </h2>

              {/* Input + Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-[#2B2A27] text-gray-300 text-sm sm:text-base font-inter px-4 py-3 rounded-xl focus:outline-none w-full sm:flex-1 border border-[#8888881A]"
                />
                <button
                  className="bg-[#FF8736] hover:bg-[#FF944D] text-[#21201B] text-sm sm:text-base font-inter font-medium px-5 py-3 rounded-[6px] w-full sm:w-auto transition"
                >
                  Subscribe
                </button>
              </div>

              {/* Social Icons */}
              <div className="flex mt-6 gap-4 sm:gap-5">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="border-2 border-[#F1BB78] rounded-[10px] w-12 h-12 sm:w-12.5 sm:h-12.5 flex items-center justify-center cursor-pointer"
                >
                  <FaFacebookF className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF833B]" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="border-2 border-[#F1BB78] rounded-[10px] w-12 h-12 sm:w-12.5 sm:h-12.5 flex items-center justify-center cursor-pointer"
                >
                  <PiInstagramLogoFill className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF833B]" />
                </motion.div>
              </div>
            </div>

            {/* Right Section - Links */}
            <div className="order-3 md:col-span-2 lg:col-span-1 flex justify-center lg:justify-end text-center md:text-center lg:text-left mt-6 md:mt-0">
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 lg:grid-cols-1 text-left gap-2">
                  {[
                    { name: "Home", href: "/" },
                    { name: "Shop", href: "/shop" },
                    { name: "About Us", href: "/about" },
                    { name: "Contact", href: "#contact" },
                  ].map((link) => (
                    <Link key={link.name} href={link.href}>
                      <motion.h1
                        className="lg:text-[25px] md:text-[20px] font-gilroy-regular text-lg font-semibold text-white cursor-pointer"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        {link.name}
                      </motion.h1>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#FFFFFF33] pt-5"></div>

          <section className="mx-auto mt-10  w-full ">
            <Marquee gradient={false} speed={90} pauseOnHover={true}>
              {/* Repeat blocks for smooth scroll */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center whitespace-nowrap  mr-8"
                >
                  <h3 className="font-bold text-[14vw] leading-none font-inter mr-5 md:mr-10">PHARMA PLUS</h3>
                </div>
              ))}
            </Marquee>
          </section>

          {/* Bottom Section */}
          <div className="mt-10 border-t border-[#FFFFFF33] pt-5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-200 gap-4">
            {/* Left */}
            <div className="flex-1 text-center md:text-left font-gilroy-regular">
              <p><a href="#"><span className="text-white font-bold font-gilroy-regular">@2025 PHARMA PLUS.</span></a> All rights reserved</p>
            </div>

            {/* Center */}
            <div className="flex-1 flex justify-center">
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-full border px-4 py-2 flex items-center gap-2 text-white border-white"
              >
                <ArrowUp className="w-4 h-4" /> Back To Top
              </motion.button>
            </div>

            {/* Right */}
            <div className="flex-1 flex justify-center md:justify-end gap-4">
              <Link href="#" className="underline text-[16px]">
                Terms of Use
              </Link>
              <span>|</span>
              <Link href="#" className="underline text-[16px]">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}