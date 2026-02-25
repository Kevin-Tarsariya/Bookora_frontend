import React from "react";
import { Link } from "react-router-dom";
import RecentlyAdded from "./RecentlyAdded";
import {
  FaBookOpen,
  FaStar,
  FaHeadset,
  FaBookmark,
  FaLightbulb,
  FaUserFriends,
} from "react-icons/fa";

const Hero = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-10">

      {/*  Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold text-yellow-100">
            Your Ultimate Online Bookstore
          </h1>
          <p className="mt-4 text-xl text-zinc-300">
            Welcome to Bookora – where stories come alive and knowledge thrives.
            Explore curated collections, discover timeless classics and trending
            titles, and make every read count.
          </p>
          <Link
            to="/all-books"
            className="inline-block mt-8 text-yellow-100 text-lg font-semibold border border-yellow-100 px-8 py-3 rounded-full hover:bg-zinc-800 transition"
          >
            Discover Books
          </Link>
        </div>

        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src="./hero.png"
            alt="Hero"
            className="w-full max-w-md md:max-w-lg"
          />
        </div>
      </div>

      {/*  Recently Added Section */}
      <div className="mt-16">
        <RecentlyAdded />
      </div>

      {/*  Experience Section */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-yellow-100 mb-10">
          Experience the Bookora Advantage
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-md hover:shadow-yellow-200 transition">
            <FaBookOpen className="text-yellow-300 text-3xl mx-auto mb-2" />
            <h3 className="text-lg font-semibold">Huge Collection</h3>
            <p className="text-zinc-400 text-sm mt-1">
              Browse thousands of books across every genre and category.
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg shadow-md hover:shadow-yellow-200 transition">
            <FaStar className="text-yellow-300 text-3xl mx-auto mb-2" />
            <h3 className="text-lg font-semibold">Top Rated Books</h3>
            <p className="text-zinc-400 text-sm mt-1">
              Discover what readers love with top reviews and ratings.
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg shadow-md hover:shadow-yellow-200 transition">
            <FaHeadset className="text-yellow-300 text-3xl mx-auto mb-2" />
            <h3 className="text-lg font-semibold">24/7 Support</h3>
            <p className="text-zinc-400 text-sm mt-1">
              Friendly support team always ready to help you.
            </p>
          </div>
        </div>
      </section>

      {/*  Why Choose Bookora Section */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-yellow-100 mb-6">
          Why Choose Bookora?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
            <FaBookmark className="text-yellow-300 text-4xl mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Personalized Library</h3>
            <p className="text-zinc-400 text-sm">
              Save your favorite books and get recommendations tailored to your taste.
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
            <FaLightbulb className="text-yellow-300 text-4xl mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Inspire and Learn</h3>
            <p className="text-zinc-400 text-sm">
              From self-help to science fiction, our books spark curiosity and growth.
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
            <FaUserFriends className="text-yellow-300 text-4xl mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Join a Community</h3>
            <p className="text-zinc-400 text-sm">
              Be part of a growing community of book lovers and share your passion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
