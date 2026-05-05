"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  {
    id: 1,
    icon: "/imgs/network1.png",
    number: 20,
    label: "Nationwide Distributions",
    sublabel: null,
  },
  {
    id: 2,
    icon: "/imgs/network2.png",
    number: 150,
    label: "Outlets Coverage",
    sublabel: null,
  },
  {
    id: 3,
    icon: "/imgs/network3.png",
    number: 500,
    label: "Key Outlets",
    sublabel: null,
  },
  {
    id: 4,
    icon: "/imgs/network4.png",
    number: 80,
    label: null,
    sublabel: (
      <p className="text-lg md:text-2xl  font-semibold font-manrope text-[#737373] text-center leading-snug mt-1">
        
        <br />
        <span className=" ">72 Modern</span> Super Shop
        Chains
      </p>
    ),
  },
];

export default function Network() {
  return (
    <section className="w-full bg-white py-10 px-6">
      <div className="max-w-[92%] mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            className=" text-2xl sm:text-3xl md:text-4xl font-satoshi lg:text-5xl font-semibold text-[#FF7A1A] leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-satoshi lg:text-5xl font-semibold text-[#FF7A1A] leading-tight">
              Our Distribution
            </span>{" "}
            Network
          </motion.h2>

          <motion.p
            className="text-[#262626] font-medium font-manrope text-base md:text-2xl lg:text-3xl mt-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We ensure fast, efficient, and consistent product availability
            across all 64 districts of Bangladesh
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              className="flex flex-col items-center justify-start border-2 border-[#FF7A1A] rounded-4xl px-5 py-8 bg-white hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
             

              <div className="px-4 py-4 text-center">
                <div className="mx-auto w-fit text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-[#FF7A1A] font-manrope leading-none">
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    enableScrollSpy
                    scrollSpyDelay={200}
                  />
                  <span>+</span>
                </div>

                {stat.label && (
                  <div className="mt-2 sm:mt-3 text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold font-manrope text-[#737373]">
                    {stat.label}
                  </div>
                )}
              </div>

              {stat.sublabel && stat.sublabel}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
