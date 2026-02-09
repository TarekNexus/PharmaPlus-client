/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client"; 
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

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
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();




  
  const onSubmit: SubmitHandler<FormValues> = async (value) => {
    const registerToast = toast.loading("Registering...");
  
    try {
      const { data,error } = await authClient.signUp.email(value);
      
      if(error){
        toast.error(error.message|| "Registration failed!",{id: registerToast });
        return
      }
      toast.success("Registration successful!", { id: registerToast });
      console.log("Registered user:", data);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Registration failed!", { id: registerToast });
    }
  };

  const handleGoogleRegister = async () => {
    try {
      toast.loading("Redirecting to Google...");
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000",
      });
      console.log(data);
    } catch (err) {
      console.error(err);
      toast.error("Google registration failed!");
    }
  };

  return (
    <section className="relative md:mb-5 md:mt-8 p-4 min-h-screen md:w-11/12 mx-auto flex items-center justify-center md:rounded-[30px] overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
      
      {/* Toast Container */}
      <Toaster position="top-right" />

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
        <Image
          src="/imgs/login.jpg"
          alt="Register Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Card */}
      <div className="relative my-20 z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-[#FF833B]">
        <div className="flex justify-center mb-4">
                  <Image src="/imgs/smallLogo.png" alt="Pharmaplus" width={60} height={60} />
                </div>
        
                <h1 className="text-3xl md:text-4xl font-gilroy-bold text-[#FF833B]  text-center">
                  Create Account
                </h1>
      
        <p className="text-center text-gray-600 font-satoshi mb-6">
          Sign up with your details or continue with Google
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-inter ">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              disabled={isSubmitting}
              {...register("name", { required: "Name is required" })}
              className={`border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#FF833B] ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#FF833B]"
              }`}
            />
            {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-inter ">Email</label>
            <input
              type="email"
              placeholder="john.doe@example.com"
              disabled={isSubmitting}
              {...register("email", { required: "Email is required" })}
              className={`border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#FF833B] ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#FF833B]"
              }`}
            />
            {errors.email && <span className="text-red-500 text-sm ">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-inter mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              disabled={isSubmitting}
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              className={`border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#FF833B] ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#FF833B]"
              }`}
            />
            {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
          </div>

          {/* Image */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-inter mb-1">Profile Image URL</label>
            <input
              type="text"
              placeholder="https://example.com/image.png"
              disabled={isSubmitting}
              {...register("image")}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF833B] focus:border-[#FF833B]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FF833B] mt-2 text-white font-bold font-satoshi py-2 rounded-lg shadow-md hover:bg-[#ff9f61] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
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
          <a href="/login" className="text-[#FF833B] font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
}
