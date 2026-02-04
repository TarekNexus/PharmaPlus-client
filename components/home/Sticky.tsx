"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { useMemo } from "react";

export type PropertyCard = {
  tag: string;
  title: string;
  subtitle?: string;
  location?: string;
  img: string;
};

const items: PropertyCard[] = [
  {
    tag: "FEATURED HEALTHCARE PRODUCT • RX SAFE",
    title: "Prescription Medicines You Can Trust",
    img: "/medicines/sticky1.png",
    subtitle:
      "Order doctor-prescribed medicines with full compliance, secure handling, and verified authenticity.",
    location: "LICENSED PHARMACY NETWORK",
  },
  {
    tag: "FEATURED SERVICE • FAST DELIVERY",
    title: "24–48 Hour Home Delivery",
    img: "/medicines/sticky2.png",
    subtitle:
      "Get essential medicines delivered quickly to your doorstep with safe packaging and real-time tracking.",
    location: "AVAILABLE IN MAJOR CITIES",
  },
  {
    tag: "FEATURED CARE • EXPERT SUPPORT",
    title: "Professional Pharmacist Consultation",
    img: "/medicines/sticky3.png",
    subtitle:
      "Receive trusted guidance on dosage, usage, and side effects from certified pharmacists anytime.",
    location: "ONLINE & ON-DEMAND",
  },
  {
    tag: "FEATURED SAVINGS • AFFORDABLE CARE",
    title: "Healthcare Made Affordable",
    img: "/medicines/sticky4.png",
    subtitle:
      "Enjoy competitive pricing, exclusive discounts, and value bundles without compromising quality.",
    location: "PHARMAPLUSE OFFERS",
  },
];


export default function Sticky() {
  const withZ = useMemo(() => items.map((c, i) => ({ ...c, z: 50 - i })), []);

  return (
    <div className="mx-auto w-11/12">
      <div className="relative">
        {withZ.map((card, i) => (
          <section
            key={card.title}
            className="sticky z-(--z) mb-6 md:mb-8"
            style={{ top: `${6 + i * 70}px` }} // first card 6px, second 56px, third 106px, ...
          >
            <div className="relative h-55 sm:h-70 md:h-127.5 rounded-[30px] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.25)] ring-1 ring-white/20">
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover"
                priority={i === 0}
              />

              <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/20 to-transparent" />

              <div className="relative h-full p-4 sm:p-6 md:p-9 flex flex-col justify-center text-white">
                {/* Tag pill */}
                <span className="flex items-center justify-center text-[8px] sm:text-[10px] md:text-sm tracking-[0.15em] font-semibold rounded-full bg-[#FF833B]   px-2 sm:px-3 py-1 w-60 sm:w-100 h-7 sm:h-8.5 mb-2 sm:mb-4 text-center">
                  {card.tag}
                </span>

                {/* Title */}
                <h3 className="font-neue text-xl  sm:text-3xl md:text-4xl lg:text-[45px] xl:text-[64px] drop-shadow leading-tight">
                  {card.title}
                </h3>

                {/* Subtitle */}
                {card.subtitle && (
                  <p className="mt-2 sm:mt-3 md:mt-4 text-[12px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[28px] max-w-full sm:max-w-181.25">
                    {card.subtitle}
                  </p>
                )}

                {/* Location */}
                {card.location && (
                  <span className="mt-2 sm:mt-3  md:mt-4 inline-flex items-center justify-center gap-1 sm:gap-2 text-[8px] sm:text-xs md:text-sm font-medium rounded-full ring-1 ring-white/30 px-2 sm:px-3 py-1 sm:py-2 border border-white w-fit">
                    <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    {card.location}
                  </span>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}