// routes/customerRoutes.ts
import { ShoppingCart, Package, UserCircle } from "lucide-react";
import { Route } from "@/types";

export const customerRoutes: Route[] = [
  { href: "/customer/cart", label: "Cart", icon: ShoppingCart },
  { href: "/orders", label: "My Orders", icon: Package },
  { href: "/profile", label: "Profile", icon: UserCircle },
];