import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [MobileNav, setMobileNav] = useState("hidden");

  // Common navigation links
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
  ];

  // Add Cart if logged in
  if (isLoggedIn && role === "user") {
    links.push({ title: "Cart", link: "/cart" });
  }

  // Add Profile based on role
  if (isLoggedIn && role === "user") {
    links.push({ title: "Profile", link: "/profile" });
  } else if (isLoggedIn && role === "admin") {
    links.push({ title: "Admin Profile", link: "/profile" });
  }

  return (
    <>
      {/* Navbar */}
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-2 items-center justify-between">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setMobileNav("hidden")}
        >
          <img className="h-20 me-1" src="/bookora.png" alt="logo" />
          <h1 className="text-2xl font-semibold">Bookora</h1>
        </Link>

        <div className="nav-links-Bookora block md:flex items-center gap-4">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-4 justify-center w-full">
            {links.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className={`flex items-center px-4 py-1 transition-all duration-300 rounded ${item.title.includes("Profile")
                    ? "border border-blue-500 hover:bg-white hover:text-zinc-800"
                    : "hover:text-blue-500"
                  }`}
              >
                {item.title}
              </Link>
            ))}

          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-4">
            {!isLoggedIn && (
              <>
                <Link
                  to="/LogIn"
                  className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              setMobileNav((prev) => (prev === "hidden" ? "block" : "hidden"))
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            onClick={() => setMobileNav("hidden")}
            className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
          >
            {item.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link
              to="/LogIn"
              onClick={() => setMobileNav("hidden")}
              className="text-white text-3xl mb-8 font-semibold px-8 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              onClick={() => setMobileNav("hidden")}
              className="text-white text-3xl mb-8 font-semibold px-8 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
