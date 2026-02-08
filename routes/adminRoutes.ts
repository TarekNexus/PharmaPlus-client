// routes/adminRoutes.ts
import { LayoutDashboard, Users, ShoppingCart, FolderTree } from "lucide-react";
import { Route } from "@/types";

export const adminRoutes: Route[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/medicine", label: "Medicine", icon: FolderTree },
];