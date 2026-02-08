"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminRoutes } from "../../routes/adminRoutes";
import { sellerRoutes } from "../../routes/sellerRoutes";
import { customerRoutes } from "../../routes/customerRoutes";
import { Route } from "@/types";

import Image from "next/image";

export default function DashboardSidebar({user}: {user: {role: string}}) {
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

  return (
    <aside className="w-16 md:w-56 border-r bg-[#FF833B] p-2 md:p-4 transition-all">
      {/* Logo - abbreviated on mobile, full on desktop */}
    <div className="mb-6 flex items-center justify-center md:justify-start">
  {/* Mobile Logo - Small/Icon version */}
  <Image
    src="/imgs/smallLogo.png" // or "/logo-small.png"
    alt="Pharmaplus"
    width={40}
    height={40}
    className="md:hidden"
  />
  
  {/* Desktop Logo - Full version */}
  <Image 
    src="/imgs/pharmapluse.png" // or "/logo.png"
    alt="Pharmaplus"
    width={150}
    height={40}
    className="hidden md:block"
  />
</div>

      <nav className="space-y-2">
        {/* Home Link */}
       
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
  // Fixed active route detection
   const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center justify-center md:justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-muted  shadow-sm"
          : "hover:bg-muted"
      )}
      title={label}
    >
     
   
      
      <Icon className="h-5 w-5 shrink-0" />

      {/* Desktop label */}
      <span className="hidden md:inline">{label}</span>

      
    </Link>
  );
}