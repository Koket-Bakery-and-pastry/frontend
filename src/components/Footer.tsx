// ...existing code...
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
    <footer className="bg-[#E6E3E3] px-6 md:px-12 lg:px-24 py-8 md:py-12 mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="flex flex-col">
          <div className="text-[#C967AC] text-xl sm:text-2xl font-kaushan mb-2">
            Koket Bakery And Pastry
          </div>
          <p className="text-gray-700 text-sm sm:text-sm max-w-md">
            Creating memorable moments with delicious custom cakes and desserts
            since 2020.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div className="text-[#C967AC] font-kaushan mb-2 text-lg sm:text-xl">
            Quick Links
          </div>
          <ul className="space-y-2 text-sm">
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
          <div className="text-[#C967AC] font-kaushan mb-2 text-lg sm:text-xl">
            Contact
          </div>
          <ul className="text-sm space-y-1">
            <li className="break-words">123, Bakery Street</li>
            <li>Adama City, SC 12345</li>
            <li>Phone: (+251) 900-123-456</li>
            <li>
              Email:{" "}
              <Link
                href="mailto:hello@sweetcake.com"
                className="hover:text-pink-400"
              >
                hello@sweetcake.com
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <div className="text-[#C967AC] font-kaushan mb-2 text-lg sm:text-xl">
            Follow Us
          </div>
          <div className="flex gap-4 mt-2 text-2xl sm:text-3xl">
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

      <div className="mt-8 border-t border-[#DBD7D7] pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-800 text-sm sm:text-base">
            <FaRegCopyright />
            <span>Velour Cake. All Rights reserved</span>
          </div>

          <div className="text-sm text-gray-600">
            <span className="hidden sm:inline">Designed with care • </span>
            <Link href="/terms" className="hover:text-pink-400 mr-2">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-pink-400">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
