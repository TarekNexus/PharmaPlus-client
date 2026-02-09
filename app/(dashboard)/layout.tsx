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
    <div className="flex h-screen overflow-hidden bg-muted/40">
      
      {/* Sidebar fixed */}
      <DashboardSidebar user={data.user} />

      {/* Right section */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* Header fixed */}
        <DashboardHeader user={data.user}/>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-2">
          {children}
        </main>

      </div>
    </div>
  );
}
