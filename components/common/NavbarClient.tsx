
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";


interface NavbarClientProps {
  user?: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "SELLER" | "CUSTOMER";
    image?: string;
  } | null;
}

const NavbarClient = ({ user }: NavbarClientProps) => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const links = [
    { href: "/" as const, label: "Home" },
    { href: "/shop" as const, label: "Shop" },
    { href: "/cart" as const, label: "Cart" },
    { href: "#contact" as const, label: "Contact" },
  ];

  const handleLinkClick = (index: number) => {
    setSelectedIndex(index);
  };

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

  const getDashboardPath = () => {
    if (!user) return "/login";
    return `/${user.role.toLowerCase()}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // ✅ Scroll listener for hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "w-full sm:top-10 top-3 left-0 flex items-center justify-between px-10 lg:px-30 py-2 text-black z-50 fixed transition-transform duration-500 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-30"
      )}
    >
      {/* Logo */}
      <div>
        <div className="w-30 md:w-40 ">
          <Link href="/">
            <Image
              src="/imgs/pharmapluse.png"
              alt="logo"
              width={175.78}
              height={34.13}
              className="h-auto w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="max-lg:hidden">
        <nav className="h-13.25 bg-[#FFFFFF] flex justify-center items-center rounded-[15px] px-10 shadow-sm">
          <ul className="flex items-center gap-8">
            {links.map((link, i) => (
              <li key={link.label}>
  <Link
    href={link.href}
    onClick={() => handleLinkClick(i)}
    className={cn(
      "relative text-[15.63px] leading-[150%] tracking-[7%] text-black font-medium font-satoshi",
      "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#FF833B] after:transition-all after:duration-300 after:ease-in-out",
      "hover:after:w-full"
    )}
  >
    {link.label}
  </Link>
</li>

            ))}
           
          </ul>
        </nav>
      </div>

      {/* Desktop Auth Section */}
      <div className="max-lg:hidden flex items-center gap-4">
        {user ? (
          <>
           
          

            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white bg-[#0000004D] hover:bg-[#00000066] transition-all duration-300 cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-[#FF833B] text-black text-xs font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[14px] text-white font-medium max-w-25 truncate">
                    {user.name}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={getDashboardPath()} className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link href="/login">
            <button className="pl-4 pr-1.5 py-1.25 rounded-full cursor-pointer border border-white text-white bg-[#0000004D] hover:bg-[#00000066] transition-all duration-300 ease-in-out">
              <span className="text-[15.63px] leading-[150%] tracking-[7%] text-white font-medium flex items-center justify-center gap-3">
                Login
                <ArrowUpRight className="w-6 h-6 bg-[#FF833B] text-black rounded-full p-1" />
              </span>
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="max-lg:block hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button>
              <Menu color="white" width={25} height={25} />
            </button>
          </SheetTrigger>

          <SheetContent className="bg-[#001725] text-white border-l-0">
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
              <SheetDescription className="text-gray-400">
                {user ? `Welcome, ${user.name}` : "Navigate your way"}
              </SheetDescription>
            </SheetHeader>

            {/* User Info in Mobile */}
            {user && (
              <div className="flex items-center gap-3 py-4 border-b border-white/20 mt-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="bg-[#FF833B] text-black font-semibold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-white">{user.name}</span>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>
              </div>
            )}

            <div className="mt-6">
              <ul className="flex flex-col gap-4">
                {links.map((link, i) => (
                  <li key={link.label}>
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        onClick={() => handleLinkClick(i)}
                        className={cn(
                          "relative text-base leading-[150%] tracking-[7%] font-bold pl-4 after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1 after:size-1.5 after:rounded-full after:bg-transparent after:transition-all after:duration-300 after:ease-in-out",
                          selectedIndex === i && "after:bg-[#FF833B]"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}

                {user && (
                  <li>
                    <SheetClose asChild>
                      <Link
                        href={getDashboardPath()}
                        className="relative text-base leading-[150%] tracking-[7%] font-bold pl-4"
                      >
                        Dashboard
                      </Link>
                    </SheetClose>
                  </li>
                )}
              </ul>
            </div>

            <SheetFooter className="mt-auto">
              {user ? (
                <SheetClose asChild>
                  <button
                    onClick={handleLogout}
                    className="w-full h-11 rounded-[15px] border border-red-500 text-red-500 hover:bg-red-500/10 transition-all mt-10"
                  >
                    <span className="text-[15.63px] leading-[150%] tracking-[7%] font-medium flex items-center justify-center gap-3">
                      <LogOut className="w-5 h-5" />
                      Logout
                    </span>
                  </button>
                </SheetClose>
              ) : (
                <SheetClose asChild>
                  <Link href="/login" className="w-full">
                    <button className="w-full h-11 rounded-[15px] border border-white mt-10 hover:bg-white/10 transition-all">
                      <span className="text-[15.63px] leading-[150%] tracking-[7%] text-white font-medium flex items-center justify-center gap-3">
                        Login
                        <ArrowUpRight className="w-6 h-6 bg-[#FF833B] text-black rounded-full p-1" />
                      </span>
                    </button>
                  </Link>
                </SheetClose>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default NavbarClient;