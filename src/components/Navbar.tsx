import React from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const NavLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Custom Order", href: "/custom-cake" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full   px-24 py-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex flex-col">
        <span className="text-[#C967AC] text-2xl font-kaushan ">
          Koket Bakery
        </span>
        {/* <span className="text-[#C967AC] text-2xl font-kaushan ">
          And Pastry
        </span> */}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex justify-center gap-10">
        {NavLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className=" text-lg hover:text-[#C967AC] transition"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Cart and Login */}
      <div className="flex items-center gap-8">
        <Link
          href="/cart"
          className="text-[#C967AC] text-2xl transition-colors duration-200 hover:text-[#ae5d95] hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C967AC] rounded-full"
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
  );
}

export default Navbar;
