import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBooks();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(`http://localhost:3000/api/v1/add-book-to-favourite`, {}, { headers });
    alert(response.data.message);
  }

  const handleCart = async () => {
    const response = await axios.put(`http://localhost:3000/api/v1/add-to-cart`, {}, { headers });
    alert(response.data.message);
  }

  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/delete-book/${id}`,
        {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(response.data.message);
      navigate("/all-books");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "An error occurred while deleting the book.");
    }
  };

  return (
    <>
      {data ? (
        <div className="min-h-screen px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">

          {/* Left Section */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col md:flex-row bg-zinc-800 p-6 md:p-8 rounded-lg gap-6">

              {/* Image */}
              <div className="w-full md:w-1/2 flex justify-center items-center">
                <img
                  src={data.url}
                  alt="Product"
                  className="max-h-[40vh] md:max-h-[60vh] lg:max-h-[70vh] object-contain rounded"
                />
              </div>

              {/* Buttons (User/Admin Based) */}
              {isLoggedIn && role === "user" && (
                <div className="w-full md:w-1/2 flex flex-row md:flex-col justify-center items-center gap-4 md:gap-6">
                  <button
                    className="bg-white rounded-full text-2xl p-4 text-red-500 flex items-center justify-center hover:scale-105 transition"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                    <span className="ml-3 text-sm font-medium block md:hidden">Favourites</span>
                  </button>

                  <button
                    className="bg-white rounded-full text-2xl p-4 text-blue-500 flex items-center justify-center hover:scale-105 transition"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="ml-3 text-sm font-medium block md:hidden">Add to Cart</span>
                  </button>
                </div>
              )}

              {isLoggedIn && role === "admin" && (
                <div className="w-full md:w-1/2 flex flex-row md:flex-col justify-center items-center gap-4 md:gap-6">
                  <Link
                    to={`/updateBook/${id}`}
                    className="bg-white rounded-full text-2xl p-4 flex items-center justify-center hover:scale-105 transition"
                  >
                    <FaEdit />
                    <span className="ml-3 text-sm font-medium block md:hidden">Edit Book</span>
                  </Link>

                  <button
                    className="bg-white rounded-full text-2xl p-4 text-red-500 flex items-center justify-center hover:scale-105 transition"
                    onClick={deleteBook}
                  >
                    <MdDelete />
                    <span className="ml-3 text-sm font-medium block md:hidden">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 p-4">
            <h1 className="text-3xl md:text-4xl text-zinc-300 font-semibold">{data?.title}</h1>
            <p className="text-zinc-400 mt-1">by {data?.author}</p>
            <p className="text-zinc-500 mt-4 text-lg md:text-xl">{data?.desc}</p>
            <p className="flex mt-4 items-center text-zinc-400">
              <GrLanguage className="me-3" /> {data?.language}
            </p>
            <p className="mt-4 text-zinc-100 text-2xl md:text-3xl font-semibold">
              Price: ₹ {data?.price}
            </p>
          </div>

        </div>
      ) : (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}

    </>
  );
};

export default ViewBookDetails;
