"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Medicine = {
  name: string;
  price: number;
  img: string;
  id: string;
};

const medicines: Medicine[] = [
  { id: "1", name: "Napa Rapid", price: 50, img: "/medicines/Napa-Rapid.jpg" },
  { id: "2", name: "Histacin", price: 15, img: "/medicines/histacin.jpg" },
  { id: "3", name: "Naproxen 250mg", price: 60, img: "/medicines/naproxen.jpg" },
  { id: "4", name: "Paracetamol 500mg", price: 25, img: "/medicines/paracetamol.jpg" },
  { id: "5", name: "Vitamin C Plusp", price: 120, img: "/medicines/vitamin-c.jpg" },
  { id: "6", name: "B-Complex Forte", price: 70, img: "/medicines/b-complex.png" },
];

export default function MedicinesSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(1);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    const updateVisible = () => setVisible(getVisibleCount());
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const step = card.offsetWidth + 24; // gap-6
    el.scrollTo({ left: i * step, behavior: "smooth" });
  };

  const scroll = (dir: "left" | "right") => {
    const next =
      dir === "left"
        ? Math.max(0, index - visible)
        : (index + visible) % medicines.length;
    goTo(next);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const card = el.querySelector<HTMLElement>("[data-card]");
          if (card) setIndex(Math.round(el.scrollLeft / (card.offsetWidth + 24)));
          ticking = false;
        });
        ticking = true;
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const next = (index + visible) % medicines.length;
      goTo(next);
    }, 2000);
    return () => clearInterval(id);
  }, [index, paused, visible]);

  return (
    <section className="mx-auto w-11/12 mt-10 rounded-[25px] bg-[#FFF7F2] py-6">
      <div className="px-6 sm:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h2 className="text-[25px] text-[#FF7A1A] sm:text-[35px] md:text-[45px] leading-tight text-balance font-neue-haas-grotesk-display-pro font-medium">
            Most Popular Medicines
          </h2>
          <p className="text-slate-700 max-w-[38ch] text-sm sm:text-base text-left md:text-right">
            Browse our most popular medicines and easily order online to get them delivered to your doorstep.
          </p>
        </div>

        {/* Arrows */}
        <div className="flex items-center justify-end mt-4 gap-2">
        <button
  aria-label="Previous"
  onClick={() => scroll("left")}
  className="rounded-full backdrop-blur p-2 text-[#FF7A1A] hover:bg-[#FF7A1A]/15 transition"
>
  <ChevronLeft className="h-4 w-4" />
</button>

<button
  aria-label="Next"
  onClick={() => scroll("right")}
  className="rounded-full backdrop-blur p-2 text-[#FF7A1A] hover:bg-[#FF7A1A]/15 transition"
>
  <ChevronRight className="h-4 w-4" />
</button>

        </div>

        {/* Slider */}
        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-5 flex gap-3 overflow-x-auto pb-2 pt-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          <style>{`div::-webkit-scrollbar{display:none}`}</style>

          {medicines.map((m, i) => (
               <article
                                  key={`${m.name}-${i}`}
                            data-card
                            className="group relative shrink-0 overflow-hidden rounded-[22px] snap-start
lg:w-113.75 md:w-75.5 w-72.5 h-50 sm:h-65 md:h-65 lg:h-65
 hover:ring-[#FF7A1A]/60 transition-all"

                        >
                            <Image
                               src={m.img}
                alt={m.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                priority={i < 3}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-1" />

                            {/* Icons */}
                            <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
                                <span className="text-xl sm:text-2xl font-medium opacity-95 text-[#FF7A1A] font-satoshi">${m.price}</span>
                            </div>

                            {/* Border + Gradient */}
                            <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-white/20" />
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/55 to-transparent" />

                            {/* Bottom Text */}
                            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-5 pb-5 text-white">
                                <h3 className="text-xl sm:text-2xl font-medium tracking-wide font-satoshi">{m.name}</h3>
                            </div>
                        </article>
          ))}
        </div>
      </div>
    </section>
  );
}
