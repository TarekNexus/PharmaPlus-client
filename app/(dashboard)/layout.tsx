"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    const userInfo = {
       role: "CUSTOMER"
    }
  return (
    <div className="flex min-h-screen bg-muted/40">
      <DashboardSidebar user={userInfo} />

      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
