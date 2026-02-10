// routes/customerRoutes.ts
import {  Package, UserCircle } from "lucide-react";
import { Route } from "@/types";

export const customerRoutes: Route[] = [
  
  { href: "/customer", label: "My Orders", icon: Package },
{ href: "/customer/profile", label: "Profile", icon: UserCircle },
];