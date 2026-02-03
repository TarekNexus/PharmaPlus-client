/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Registration failed");
      }

      console.log("Register response:", result);

      // Redirect to login after successful registration
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto mt-8">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <Input
          type="text"
          placeholder="Enter your name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Password</label>
        <Input
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required", minLength: 6 })}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Image URL (optional)</label>
        <Input
          type="text"
          placeholder="Enter image URL"
          {...register("image")}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
