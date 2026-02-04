"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";

export type StatItem = {
  value: string;
  label: string;
  desc: string;
};

const defaultStats: StatItem[] = [
  {
    value: "500",
    label: "MEDICINES",
    desc:
      "Offering over 500 pharmacy products, from daily essentials to specialty medicines, ensuring quality and reliability for our customers.",
  },
  {
    value: "1200",
    label: "HAPPY CUSTOMERS",
    desc:
      "Trusted by over 1,200 satisfied customers who rely on PharmaPlus for convenient and reliable online pharmacy services.",
  },
  {
    value: "50",
    label: "BRANDS",
    desc:
      "Partnered with 50+ trusted pharmaceutical brands to provide authentic, high-quality medicines and wellness products.",
  },
  {
    value: "24",
    label: "HOURS SUPPORT",
    desc:
      "Round-the-clock support to answer queries, process orders, and ensure your healthcare needs are met anytime, anywhere.",
  },
];

export default function Highlights() {
  return (
    <section className="w-11/12 mx-auto py-5">
      {/* Heading */}
      <motion.div
        className="mb-5 flex flex-col md:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-semibold leading-tight text-[#FF833B]">
          Your Health,
          Our Priority
        </h2>

        {/* Paragraph */}
        <p className="text-[#3E5468] text-base sm:text-lg max-w-97.5 leading-relaxed">
          PharmaPlus makes online pharmacy simple, safe, and reliable — delivering medicines and wellness products straight to your doorstep.
        </p>
      </motion.div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {defaultStats.map((s, i) => (
          <motion.div
            key={i}
            className="rounded-2xl bg-[#F8F8F8] p-6 ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-0.5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <div className="text-[48px] leading-none font-medium text-[#FF833B]">
              <CountUp
                start={0}
                end={parseFloat(s.value)}
                duration={3}
                suffix="+"
                enableScrollSpy
                scrollSpyDelay={100}
              >
                {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>
            </div>
            <div className="mt-2 text-[11px] tracking-[0.18em] font-semibold text-[#191919]">
              {s.label}
            </div>
            <p className="mt-3 text-sm text-[#999999] leading-relaxed">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
