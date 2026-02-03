
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminRoutes } from "../../routes/adminRoutes";
import { sellerRoutes } from "../../routes/sellerRoutes";
import { customerRoutes } from "../../routes/customerRoutes";
import { Route } from "@/types";


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
    <aside className="w-64 border-r bg-background p-4">
      <h2 className="mb-6 text-xl font-bold">Pharmaplus</h2>

      <nav className="space-y-2">
        {routes.map((route) => (
          <NavItem key={route.href} href={route.href} pathname={pathname}>
            {route.label}
          </NavItem>
        ))}
      </nav>
    </aside>
  );
}

function NavItem({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={cn(
        "block rounded-md px-3 py-2 text-sm font-medium transition",
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      )}
    >
      {children}
    </Link>
  );
}
