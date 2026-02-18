/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const onSubmit: SubmitHandler<FormValues> = async (value) => {
    const registerToast = toast.loading("Registering...");
    try {
      const { data, error } = await authClient.signUp.email(value);

      if (error) {
        toast.error(error.message || "Registration failed!", {
          id: registerToast,
        });
        return;
      }

      toast.success("Registration successful!", { id: registerToast });
      console.log("Registered user:", data);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Registration failed!", {
        id: registerToast,
      });
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.secure_url) {
        setValue("image", data.secure_url);
        setPreview(data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleGoogleRegister = async () => {
    try {
      toast.loading("Redirecting to Google...");
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "https://pharma-plus-client.vercel.app",
      });
      console.log(data);
    } catch (err) {
      console.error(err);
      toast.error("Google registration failed!");
    }
  };

  return (
    <section className="relative md:mb-5 md:mt-8 p-4 min-h-screen md:w-11/12 mx-auto flex items-center justify-center md:rounded-[30px] overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
      <Toaster position="top-right" />

      <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
        <Image
          src="/imgs/login.jpg"
          alt="Register Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative my-20 z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-[#FF833B]">
        <div className="flex justify-center mb-1">
          <Image
            src="/imgs/smallLogo.png"
            alt="Pharmaplus"
            width={60}
            height={60}
          />
        </div>

        <h1 className="lg:text-3xl md:lg:text-3xl text-2xl text-center font-satoshi font-bold text-[#FF833B]">
          Create Account
        </h1>
        <p className="text-center text-gray-600 font-satoshi mb-3">
          Sign up with your details or continue with Google
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-700  font-satoshi ">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              disabled={isSubmitting}
              {...register("name", { required: "Name is required" })}
              className={`border px-4 py-2 font-satoshi rounded-lg focus:outline-none focus:ring-2 focus:border-[#FF833B] ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#FF833B]"}`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-satoshi">Email</label>
            <input
              type="email"
              placeholder="john.doe@example.com"
              disabled={isSubmitting}
              {...register("email", { required: "Email is required" })}
              className={`border px-4 py-2 font-satoshi rounded-lg focus:outline-none focus:ring-2 focus:border-[#FF833B] ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#FF833B]"}`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-satoshi">Password</label>
            <input
              type="password"
              placeholder="********"
              disabled={isSubmitting}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`border px-4 py-2 font-satoshi rounded-lg focus:outline-none focus:ring-2 focus:border-[#FF833B] ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#FF833B]"}`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="text-gray-700  mb-1 font-satoshi">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading || isSubmitting}
              className="border border-gray-300 rounded-lg font-satoshi px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF833B] focus:border-[#FF833B]"
            />
            {uploading && (
              <span className="text-[#FF833B] mt-1">Uploading...</span>
            )}
            {preview && (
              <div className="flex justify-center">
                {" "}
                <Image
                  src={preview} // Cloudinary URL
                  alt="Profile"
                  width={96}
                  height={96}
                  className="mt-2 rounded-lg border"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || uploading}
            className="w-full bg-[#FF833B] mt-2 text-white font-bold font-satoshi py-2 rounded-lg shadow-md hover:bg-[#ff9f61] transition-all disabled:opacity-70"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-gray-500 font-inter">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleRegister}
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:shadow-md transition"
        >
          <FcGoogle size={24} />
          <span className="font-satoshi font-semibold text-gray-700">
            {isSubmitting ? "Redirecting..." : "Continue with Google"}
          </span>
        </button>

        <p className="text-center text-gray-500 mt-6 font-inter">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#FF833B] font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </section>
  );
}
