"use client";

import { motion } from "framer-motion";
import HouseStarIcon from "@/icons/HouseStarIcon";
import PeopleIcon from "@/icons/PeopleIcon";
import ProfileIcon from "@/icons/ProfileIcon";
import SearchIcon from "@/icons/SearchIcon";

type Card = {
    icon: React.ReactNode;
    number: string;
    title: string;
    desc: string;
};

const cards: Card[] = [
  {
    icon: <PeopleIcon className="w-4 h-4" />,
    number: "01",
    title: "Trusted & Licensed Pharmacy Network",
    desc: "All medicines are sourced from licensed pharmacies and verified suppliers, ensuring authenticity, safety, and quality every time you order."
  },
  {
    icon: <HouseStarIcon className="w-4 h-4" />,
    number: "02",
    title: "Affordable Pricing & Cost Savings",
    desc: "We help you save on healthcare costs with transparent pricing, regular discounts, and value-packed medicine bundles."
  },
  {
    icon: <ProfileIcon className="w-4 h-4" />,
    number: "03",
    title: "Expert Pharmacist Guidance",
    desc: "Get professional advice on medicine usage, dosage, and side effects from qualified pharmacists before you place an order."
  },
  {
    icon: <SearchIcon className="w-4 h-4" />,
    number: "04",
    title: "Fast, Reliable & Secure Home Delivery",
    desc: "Enjoy quick doorstep delivery with secure packaging, real-time order tracking, and hassle-free refills."
  },
];

export default function Features() {
    // Animation variants for section
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.8, 
                when: "beforeChildren", 
                staggerChildren: 0.15 
            } 
        },
    };

    // Animation variants for each card
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <motion.section
            className="mx-auto w-11/12 mt-10 rounded-[15px] bg-[#FF833B] py-8 sm:py-10 md:py-12"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="px-6 sm:px-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 sm:mb-10 md:mb-12">
                    <h2 className="text-[25px] sm:text-[35px] md:text-[45px] leading-tight text-balance font-neue-haas-grotesk-display-pro font-medium text-[#FFFFFF]">
                   Why Customers Trust
  <br className="hidden sm:block" /> PharmaPluse for Their Healthcare Needs
                    </h2>
                    <div className="flex flex-col items-start md:items-end">
                      <p className="text-[#FFFFFF] max-w-[38ch] text-sm sm:text-base text-left">
  From genuine medicines to expert guidance and fast delivery, these are the reasons PharmaPluse is a trusted name in online healthcare.
</p>
                    </div>
                </div>

                {/* Featured Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {cards.map((card) => (
                        <motion.div
                            key={card.number}
                            className="bg-[#FFFFFF] rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
                            variants={cardVariants}
                        >
                            {/* Icon */}
                            <div className="w-8 h-8 text-white bg-[#FF833B] rounded-full flex items-center justify-center text-sm">
                                {card.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-[#FF833B] text-lg sm:text-xl font-medium leading-tight font-satoshi">
                                {card.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[#999999] text-sm sm:text-base leading-relaxed font-satoshi">
                                {card.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}