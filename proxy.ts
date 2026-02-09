import { NextRequest, NextResponse } from "next/server";

import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let role: string | null = null;

  const { data } = await userService.getSession();
  
  if (data) {
    isAuthenticated = true;
    role = data.user.role; // admin, user, seller
  }

  console.log(data);

  // * User is not authenticated at all
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isAuthenticated && pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
   if (!isAuthenticated && pathname.startsWith("/checkout")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // * Role-based access control
  if (role === Roles.admin && pathname.startsWith("/customer")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (role === Roles.admin && pathname.startsWith("/seller")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (role === Roles.customer && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/customer", request.url));
  }

  if (role === Roles.customer && pathname.startsWith("/seller")) {
    return NextResponse.redirect(new URL("/customer", request.url));
  }

  if (role === Roles.seller && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/seller", request.url));
  }

  if (role === Roles.seller && pathname.startsWith("/customer")) {
    return NextResponse.redirect(new URL("/seller", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/customer",
    "/customer/:path*", 
    "/admin",
    "/admin/:path*",
    "/seller",
    "/seller/:path*",
    "/cart",
    "/checkout"
  ],
};
