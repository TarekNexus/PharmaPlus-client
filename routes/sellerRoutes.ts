// routes/sellerRoutes.ts
import { LayoutDashboard, Pill, ShoppingCart } from "lucide-react";
import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  { href: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/medicines", label: "Medicines", icon: Pill },
  { href: "/seller/orders", label: "Orders", icon: ShoppingCart },
];