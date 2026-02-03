"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/ModeToggle";

export default function Navbar() {
  // Dummy role for now: "admin" | "seller" | "customer" | null
  const role = "customer"; // Replace with useAuth or useRole hook later
  const isLoggedIn = !!role;

  // Determine dashboard path based on role
  const dashboardPath = role
    ? `/${role}`
    : "/login";

  return (
    <nav className="flex items-center justify-between px-6 h-16 border-b bg-background">
      <Link href="/" className="text-xl font-bold">
        💊 MediStore
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/shop">Shop</Link>

        {/* Show Cart only for customer */}
        {role === "customer" && <Link href="/dashboard/customer/cart">Cart</Link>}

        {/* Dashboard link for any logged-in user */}
        {isLoggedIn && <Link href={dashboardPath}>Dashboard</Link>}

        {/* Login / Logout */}
        {isLoggedIn ? (
          <Button variant="outline">Logout</Button>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
      <ModeToggle />
    </nav>
  );
}
