"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminRoutes } from "../../routes/adminRoutes";
import { sellerRoutes } from "../../routes/sellerRoutes";
import { customerRoutes } from "../../routes/customerRoutes";
import { Route } from "@/types";

import Image from "next/image";

export default function DashboardSidebar({ user }: { user: { role: string; image: string | null; name: string } }) {
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

      {/* Bottom: User Profile */}
      <div className="mb-10 flex items-center gap-3  md:px-2 py-2 bg-white/20 rounded-md hover:bg-white/30 transition-all cursor-pointer">
        <Image
          src={user.image || "/imgs/defaultProfile.png"} // fallback image
          alt={user.name}
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
        <span className="hidden md:inline text-white font-medium">{user.name}</span>
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
        isActive ? "bg-muted shadow-sm" : "hover:bg-muted"
      )}
      title={label}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}
