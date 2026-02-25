import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGlobe } from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  return (
    <footer className="bg-zinc-800 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <a href="/">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <img src="/bookora.png" alt="Bookora logo" className="h-10" />
            Bookora
            </h2></a>
          <p className="text-sm text-zinc-400">
            Discover and organize your favorite books anytime, anywhere.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-zinc-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/all-books" className="hover:text-white">Books</a></li>
            
            {isLoggedIn && (
              <>
                <li><a href="/profile" className="hover:text-white">Profile</a></li>
                <li><a href="/cart" className="hover:text-white">Cart</a></li>
              </>
            )}
          </ul>
        </div>

        {/* Help / Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-sm text-zinc-400">
            <li><a href="/ContactUs" className="hover:text-white">Contact Us</a></li>
            <li><a href="/ContactUs" className="hover:text-white">FAQ</a></li>
            <li><a href="/ContactUs" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-zinc-200">Follow Us</h3>
          <div className="flex space-x-4 text-xl text-zinc-400">
            <a href="#" aria-label="Website">
              <FaGlobe className="hover:text-white transition-colors duration-200" />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebookF className="hover:text-white transition-colors duration-200" />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram className="hover:text-white transition-colors duration-200" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="hover:text-white transition-colors duration-200" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-zinc-500 mt-10 border-t border-zinc-700 pt-4">
        &copy; 2025 All Rights Reserved by <span className="text-white font-medium">Bookora</span>
      </div>
    </footer>
  );
};

export default Footer;
