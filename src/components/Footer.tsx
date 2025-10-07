import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaRegCopyright,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-[#E6E3E3]  px-24 py-14 mt-8">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 ">
        {/* Brand */}
        <div className="">
          <div className="text-[#C967AC] text-2xl font-kaushan mb-2">
            Koket Bakery And Pastry
          </div>
          <p className="text-gray-700 text-sm max-w-xs">
            Creating memorable moments with delicious custom cakes and desserts
            since 2020.
          </p>
        </div>
        {/* Quick Links */}
        <div className="">
          <div className="text-[#C967AC] font-kaushan mb-2 text-xl">
            Quick Links
          </div>
          <ul className="space-y-1">
            <li>
              <Link href="/products" className="hover:text-pink-400">
                Products
              </Link>
            </li>
            <li>
              <Link href="/custom-cake" className="hover:text-pink-400">
                Custom Order
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-pink-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-pink-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <div className="text-[#C967AC] font-kaushan mb-2 text-xl">
            Contact
          </div>
          <ul className="text-sm space-y-1">
            <li>123, Bakery Street</li>
            <li>Adama City, SC 12345</li>
            <li>Phone: (+251) 900-123-456</li>
            <li>Email: hello@sweetcake.com</li>
          </ul>
        </div>
        {/* Social */}
        <div>
          <div className="text-[#C967AC] font-kaushan mb-2 text-xl">
            Follow Us
          </div>
          <div className="flex gap-4 text-2xl mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-pink-400">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-pink-400">
              <FaTiktok />
            </a>
            <a href="#" aria-label="X" className="hover:text-pink-400">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
      <div className="flex  items-center justify-center mt-8 text-gray-800 text-base gap-2">
        <FaRegCopyright />
        <span>Velour Cake. All Rights reserved</span>
      </div>
    </footer>
  );
}

export default Footer;
