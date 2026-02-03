
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { userService } from "@/services/user.service";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const { data } = await userService.getSession();
  
  return (
    <div className="flex min-h-screen bg-muted/40">
      <DashboardSidebar user={data.user} />

      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}