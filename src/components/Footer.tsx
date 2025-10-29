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
    <footer className="bg-[#D9D6D6] px-6 md:px-12 lg:px-24 py-8 md:py-12 mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="flex flex-col">
          <div className="text-primary text-xl sm:text-2xl font-kaushan mb-2">
            Koket Bakery And Pastry
          </div>
          <p className="text-foreground text-sm sm:text-sm max-w-md">
            Creating memorable moments with delicious custom cakes and desserts
            since 2020.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div className="text-primary font-kaushan mb-2 text-lg sm:text-xl">
            Quick Links
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products" className="hover:text-primary-hover">
                Products
              </Link>
            </li>
            <li>
              <Link href="/custom-cake" className="hover:text-primary-hover">
                Custom Order
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary-hover">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary-hover">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-primary font-kaushan mb-2 text-lg sm:text-xl">
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
                className="hover:text-primary-hover"
              >
                hello@sweetcake.com
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <div className="text-primary font-kaushan mb-2 text-lg sm:text-xl">
            Follow Us
          </div>
          <div className="flex gap-4 mt-2 text-2xl sm:text-3xl">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-primary-hover"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-primary-hover"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="hover:text-primary-hover"
            >
              <FaTiktok />
            </a>
            <a href="#" aria-label="X" className="hover:text-primary-hover">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-foreground text-sm sm:text-base">
            <FaRegCopyright />
            <span>Velour Cake. All Rights reserved</span>
          </div>

          <div className="text-sm text-foreground">
            <span className="hidden sm:inline">Designed with care • </span>
            <Link href="/terms" className="hover:text-primary-hover mr-2">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-primary-hover">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
