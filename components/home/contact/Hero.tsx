"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

type FormDataType = {
  name: string;
  email: string;
  message: string;
};

const GOOGLE_FORM_ID =
  "1FAIpQLSeyjayaFAmi59gTitBLZB-cjrwhhMqbf1y9AFtr5zYdEKFLbQddsdf";
const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

const ENTRY_IDS = {
  name: "entry.2046245352",
  email: "entry.1973266332",
  message: "entry.407460810",
} as const;

export default function Banner() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    message: "",
  
  });


  const [, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please provide both name and email.");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append(ENTRY_IDS.name, formData.name);
      data.append(ENTRY_IDS.email, formData.email);
      data.append(ENTRY_IDS.message, formData.message);

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });

      toast.success("Submitted! Your info has been recorded.");
      setFormData({ name: "", email: "", message: "", });
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section
      className="relative w-full md:w-11/12 flex justify-center items-center py-20 mx-auto md:rounded-3xl md:mt-5 h-full lg:h-175"
      style={{
        backgroundImage: "url('/imgs/contact.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
       <Toaster position="top-right" />
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 z-0 md:rounded-3xl bg-black/80 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      ></motion.div>

      <div className="relative z-10 flex flex-col lg:flex-row w-11/12 px-5 md:px-25 items-center justify-between gap-4">
        {/* Left text content */}
        <motion.div
          className="text-white  max-w-150 text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-[100px] lg:text-[130px] font-bold leading-[1.1] mb-4">
            LET’S <br /> TALK.
          </h1>

          <p className="text-base sm:text-lg md:text-[22px] mb-6">
           Your Health, Delivered to Your Door{" "}
            <br className="hidden sm:block" /> your vision and bring it to life.
          </p>

          <div className="space-y-2 text-sm sm:text-base">
         
            <p className="font-medium underline">+8801778188448</p>
          </div>
        </motion.div>

        {/* Right form */}
        <motion.div
          className="bg-white/95 backdrop-blur-sm  rounded-[22px] border-4 border-[#FF833B] p-5 sm:p-6 md:p-8 w-full sm:w-100 shadow-lg"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <form className="space-y-4 " onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#FF833B] mb-1">
                NAME
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-[15px] px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#FF833B] outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#FF833B] mb-1">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-[15px] px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#FF833B] outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-[#FF833B] mb-1">
                MESSAGE
              </label>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
               className="w-full border border-gray-300 rounded-[15px] px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#FF833B] outline-none"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#FF833B] hover:bg-[#cc510a] text-white font-semibold py-2.5 rounded-[15px] transition"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}