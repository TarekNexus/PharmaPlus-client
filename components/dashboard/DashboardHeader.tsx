"use client";

import { Button } from "@/components/ui/button";


export default function DashboardHeader() {
  const role = "CUSTOMER"; // dummy role

  const titleMap: Record<string, string> = {
    CUSTOMER: "Customer Dashboard",
    SELLER: "Seller Dashboard",
   ADMIN: "Admin Dashboard",
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <h1 className="text-lg font-semibold">
        {titleMap[role] ?? "Dashboard"}
      </h1>

      <Button variant="outline">Logout</Button>
    </header>
  );
}
