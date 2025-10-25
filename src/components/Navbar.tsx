"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Navbar() {
  const NavLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const AdminLinks = [
    { name: "Products", href: "/admin/products" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Users", href: "/admin/users" },
    { name: "Categories", href: "/admin/categories" },
  ];

  const isAdmin = true;

  const linksToDisplay = isAdmin ? AdminLinks : NavLinks;

  const pathname = usePathname() || "/";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const desktopLinkClass = (href: string) =>
    `2xl:text-lg transition ${
      isActive(href)
        ? "text-[#C967AC] font-semibold"
        : "font-normal hover:text-[#C967AC]"
    }`;

  const mobileLinkClass = (href: string) =>
    `text-lg font-medium ${
      isActive(href) ? "text-[#C967AC]" : "hover:text-[#C967AC] transition"
    }`;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="w-full hidden xl:flex py-8 items-center justify-between px-4 lg:px-6 xl:px-10 2xl:px-16 3xl:px-24">
        {/* Logo */}
        <div className="flex flex-col">
          <span className="text-[#C967AC] text-xl 2xl:text-3xl font-kaushan">
            Koket Bakery
          </span>
        </div>
        {/* Navigation Links */}
        <div className="flex-1 flex justify-center gap-6 2xl:gap-10">
          {linksToDisplay.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={desktopLinkClass(link.href)}
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* Cart and Login */}
        {isAdmin ? null : (
          <div className="flex items-center gap-4 2xl:gap-8">
            <Link
              href="/cart"
              className="text-[#C967AC] text-xl 2xl:text-2xl transition-colors duration-200 hover:text-[#ae5d95] hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C967AC] rounded-full"
            >
              <FaShoppingCart />
            </Link>
            <Link
              href="/auth/login"
              className="bg-[#C967AC] hover:bg-[#ae5d95] text-white font-bold px-4 py-1 rounded-full transition"
            >
              Login
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Navbar with shadcn Sheet */}
      <nav className="w-full flex xl:hidden px-4 py-4 items-center justify-between bg-white border-b">
        {/* Logo */}
        <span className="text-[#C967AC] text-xl font-kaushan">
          Koket Bakery
        </span>
        {/* Sheet Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-[#C967AC] text-[#C967AC]"
            >
              <svg width="24" height="24" fill="currentColor">
                <rect x="4" y="7" width="16" height="2" rx="1" />
                <rect x="4" y="15" width="16" height="2" rx="1" />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-6 w-4/5 max-w-xs">
            <SheetHeader>
              <SheetTitle>
                <span className="text-[#C967AC] text-xl  font-kaushan">
                  Koket Bakery
                </span>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-4 mb-8">
              {linksToDisplay.map((link) => (
                <SheetClose asChild key={link.name}>
                  <Link href={link.href} className={mobileLinkClass(link.href)}>
                    {link.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
            {isAdmin ? null : (
              <div className="flex items-center gap-4 2xl:gap-8">
                <Link
                  href="/cart"
                  className="text-[#C967AC] text-xl 2xl:text-2xl transition-colors duration-200 hover:text-[#ae5d95] hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C967AC] rounded-full"
                >
                  <FaShoppingCart />
                </Link>
                <Link
                  href="/auth/login"
                  className="bg-[#C967AC] hover:bg-[#ae5d95] text-white font-bold px-4 py-1 rounded-full transition"
                >
                  Login
                </Link>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}

export default Navbar;
