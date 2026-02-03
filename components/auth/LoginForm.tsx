/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      console.log("Login successful:", result);

      // Assuming your API returns user role like { role: "customer" }
      const userRole = result.role; // "customer" | "seller" | "admin"

      // Redirect to respective dashboard
      router.push(`/dashboard/${userRole}`);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
  
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:3000" // Adjust callback URL as needed
  });
  console.log(data);
};
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto mt-8">
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
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Logging in..." : "Login"}
      </Button>

      <div className="text-center my-2">or</div>

      <Button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full bg-red-500 hover:bg-red-600 text-white"
      >
        Login with Google
      </Button>
    </form>
  );
}
