"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "What areas does PharmaPlus deliver to?",
    answer:
      "PharmaPlus delivers medicines and healthcare products across major cities and surrounding areas, with fast and reliable home delivery options.",
  },
  {
    question: "How long does delivery usually take?",
    answer:
      "Standard delivery typically takes 24–48 hours. Express delivery options may be available depending on your location and product availability.",
  },
  {
    question: "Do you sell prescription medicines?",
    answer:
      "Yes. We provide prescription medicines in compliance with regulations. A valid prescription from a licensed doctor is required for certain medications.",
  },
  {
    question: "Are all medicines genuine and safe?",
    answer:
      "Absolutely. All medicines sold on PharmaPlus are sourced from trusted manufacturers and authorized distributors to ensure quality and safety.",
  },
  {
    question: "Can I consult a pharmacist before ordering?",
    answer:
      "Yes. Our expert pharmacists are available to assist you with medicine usage, dosage guidance, and general health-related questions.",
  },
];


export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="w-11/12 mx-auto py-4 sm:py-5 md:py-7 bg-white">
      <div className="px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">
         <h2 className="text-2xl sm:text-3xl md:text-4xl font-satoshi lg:text-5xl font-semibold text-[#FF7A1A] leading-tight">
  Your Health Questions, <br className="hidden sm:block" /> Clearly Answered
</h2>

           <div>
        <p className="text-[#191919] mb-6 lg:max-w-87.5 lg:text-justify font-satoshi text-lg mx-auto">
  Find answers to the most common questions about PharmaPlus services.
  Need more help?{" "}
  <a href="/contact" className="text-[#FF7A1A] hover:underline">
    Contact our support team
  </a>.
</p>
          </div>
        </div>

        {/* FAQ list */}
<motion.div
  initial={{ opacity: 0, y: -40 }}          // hidden state
  whileInView={{ opacity: 1, y: 0 }}        // animate when in view
  viewport={{ once: true, amount: 0.2 }}    // trigger only once, when 20% visible
  transition={{ duration: 0.8, ease: "easeInOut" }}
  className="space-y-4"
>
  {faqs.map((faq, i) => (
    <div
      key={i}
      className="box-border bg-white border-2 border-white rounded-2xl shadow-[0px_2px_6px_rgba(255,122,26,0.35)]
hover:shadow-[0px_4px_12px_rgba(255,122,26,0.5)] transition-all"
    >
      <button
        onClick={() => toggle(i)}
        className="w-full font-satoshi flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 text-left text-[#0A244D] font-medium text-base sm:text-[17px] focus:outline-none"
      >
        {faq.question}
        {activeIndex === i ? (
          <X className="w-5 h-5 shrink-0 text-[#FF7A1A]" />
        ) : (
          <Plus className="w-5 h-5 shrink-0 text-[#FF7A1A]" />
        )}
      </button>

      {/* Animated Answer */}
      <AnimatePresence initial={false}>
        {activeIndex === i && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 font-satoshi sm:px-6 pb-4 sm:pb-5 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ))}
</motion.div>



      </div>
    </section>
  );
}