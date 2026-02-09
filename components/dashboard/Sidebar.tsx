"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminRoutes } from "../../routes/adminRoutes";
import { sellerRoutes } from "../../routes/sellerRoutes";
import { customerRoutes } from "../../routes/customerRoutes";

import { LogOut, User as UserIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Route } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function DashboardSidebar({
  user,
}: {
  user: { role: string; image: string | null; name: string; email: string };
}) {
  const role = user.role;
  const pathname = usePathname();

  let routes: Route[] = [];
 
  switch (role) {
    case "ADMIN":
      routes = adminRoutes;
      break;
    case "SELLER":
      routes = sellerRoutes;
      break;
    case "CUSTOMER":
      routes = customerRoutes;
      break;
    default:
      routes = [];
  }
  const getDashboardLink = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "/admin";
      case "SELLER":
        return "/seller/";
      case "CUSTOMER":
        return "/customer";
      default:
        return "/";
    }
  };
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
 const router = useRouter();
const handleLogout = async () => {
  try {
    // Call authClient to end the session
    await authClient.signOut();

    // Redirect to login page
    router.push("/login");
    router.refresh();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
  return (
    <aside className="w-16 md:w-56 border-r bg-[#FF833B] p-2 md:p-4 flex flex-col justify-between transition-all">
      {/* Top: Logo & Navigation */}
      <div>
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center md:justify-start">
          <Link href={getDashboardLink(role)}>
            <Image
              src="/imgs/smallLogo.png"
              alt="Pharmaplus"
              width={40}
              height={40}
              className="md:hidden"
            />
          </Link>

          <Link href={getDashboardLink(role)}>
            <Image
              src="/imgs/pharmapluse.png"
              alt="Pharmaplus"
              width={150}
              height={40}
              className="hidden md:block"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {routes.map((route) => (
            <NavItem
              key={route.href}
              href={route.href}
              pathname={pathname}
              icon={route.icon}
              label={route.label}
            />
          ))}
        </nav>
      </div>

      {/* User Avatar Dropdown */}
      <div className="mb-10 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 px-2 md:px-3 py-1 rounded-full border border-white bg-white hover:bg-[#00000066] transition-all duration-300 cursor-pointer">
              <Avatar className="md:h-10 md:w-10 border-2 border-[#FF833B]">
                <AvatarImage
                  src={user.image || "/imgs/defaultProfile.png"}
                  alt="profile"
                />
                <AvatarFallback className="bg-[#FF833B] text-black text-xs font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-[14px] font-satoshi hidden md:block hover:text-white font-medium max-w-25 truncate">
                {user.name}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mx-auto  ">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium font-satoshi">{user.name}</p>
                <p className="text-xs font-satoshi">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/"} className="cursor-pointer font-satoshi">
                <UserIcon className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600 font-satoshi"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}

function NavItem({
  href,
  pathname,
  icon: Icon,
  label,
}: {
  href: string;
  pathname: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center justify-center md:justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
        isActive ? "bg-muted shadow-sm" : "hover:bg-muted",
      )}
      title={label}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}
