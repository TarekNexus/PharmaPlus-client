"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function DashboardHeader({
  user,
}: {
  user: { name: string; image?: string; role: string; email: string };
}) {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    const logoutToast = toast.loading("Logging out...");
    try {
      await authClient.signOut();
      toast.success("Logged out successfully!", { id: logoutToast });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed!", { id: logoutToast });
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6 relative">
      <Toaster position="top-right" />

      {/* Left: Dashboard title */}
      <h1 className="md:text-lg text-xs font-satoshi font-semibold">
        {user.role}-DASHBOARD
      </h1>
    <Link href="/" className="hidden md:block">
      <button className="flex  items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 font-satoshi bg-white  font-medium hover:bg-gray-100 hover:shadow-md transition-all">
        <Home className="w-4 h-4" />
        Back to Home
      </button>
    </Link>
      {/* Right: Profile & Logout */}
      <div className="flex items-center gap-4 relative">
        {/* Profile Avatar */}
        <div
          className="relative"
          onMouseEnter={() => setShowProfile(true)}
          onMouseLeave={() => setShowProfile(false)}
        >
          <Avatar className="w-10 h-10 cursor-pointer">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name} />
            ) : (
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            )}
          </Avatar>

          {/* Hover card */}
          {showProfile && (
            <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-lg p-3 flex flex-col gap-1 border border-gray-200 z-50">
              <p className="font-medium text-gray-800 truncate">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          )}
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex justify-center items-center h-11 rounded-[15px] border border-red-500 text-red-500 hover:bg-red-500/10 transition-all px-4 gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[15.63px] leading-[150%] tracking-[7%] font-medium">
            Logout
          </span>
        </button>
      </div>
    </header>
  );
}
