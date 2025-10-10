import React from "react";
import Link from "next/link";
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
    { name: "Custom Order", href: "/custom-cake" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="w-full hidden md:flex px-8 lg:px-24 py-6 items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col">
          <span className="text-[#C967AC] text-xl lg:text-3xl font-kaushan">
            Koket Bakery
          </span>
        </div>
        {/* Navigation Links */}
        <div className="flex-1 flex justify-center gap-6 lg:gap-10">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="lg:text-lg hover:text-[#C967AC] transition font-normal"
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* Cart and Login */}
        <div className="flex items-center gap-4 lg:gap-8">
          <Link
            href="/cart"
            className="text-[#C967AC] text-xl lg:text-2xl transition-colors duration-200 hover:text-[#ae5d95] hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C967AC] rounded-full"
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
      </nav>

      {/* Mobile Navbar with shadcn Sheet */}
      <nav className="w-full flex md:hidden px-4 py-4 items-center justify-between bg-white border-b">
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
              {NavLinks.map((link) => (
                <SheetClose asChild key={link.name}>
                  <Link
                    href={link.href}
                    className="text-lg font-medium hover:text-[#C967AC] transition"
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="flex flex-col items-start gap-4  ">
              <SheetClose asChild>
                <Link href="/cart" className="text-[#C967AC] text-4xl">
                  <FaShoppingCart />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/auth/login"
                  className="bg-[#C967AC] hover:bg-[#ae5d95] text-white font-bold px-4 py-1 rounded-full transition"
                >
                  Login
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}

export default Navbar;
