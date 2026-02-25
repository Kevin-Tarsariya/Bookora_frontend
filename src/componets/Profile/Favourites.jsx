import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          "https://bookora-backend-4nea.onrender.com/api/v1/get-favourite-books",
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      {favouriteBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-zinc-500 flex-grow py-16">
          <p className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            No Favourite Books
          </p>
          <img
            src="./star.png"
            alt="star"
            className="h-24 sm:h-32 md:h-40 my-6"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favouriteBooks.map((book, i) => (
            <BookCard key={i} data={book} favourite={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
