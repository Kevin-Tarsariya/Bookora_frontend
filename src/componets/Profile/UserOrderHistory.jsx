import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://bookora-backend-4nea.onrender.com/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetch();
  }, []);

  return (
    <>
      {/* Loader */}
      {!OrderHistory && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* No Orders */}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt="Empty Cart"
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      )}

      {/* Orders Exist */}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>

          {/* Table Header */}
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%] text-center"><h1>Sr.</h1></div>
            <div className="w-[22%]"><h1>Books</h1></div>
            <div className="w-[45%]"><h1>Description</h1></div>
            <div className="w-[9%]"><h1>Price</h1></div>
            <div className="w-[9%]"><h1>Qty</h1></div>
            <div className="w-[16%]"><h1>Status</h1></div>
            <div className="w-none md:w-[5%] hidden md:block"><h1>Mode</h1></div>
          </div>

          {/* Orders */}
          {OrderHistory.map((items, i) => (
            <div key={items._id || i} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
              <div className="w-[3%]">
                <h1 className="text-cneter">{i + 1}</h1>
              </div>
              <div className="w-[22%]">
                {items.book ? (
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                ) : (
                  <span className="text-zinc-300">{items.title || "[Book Deleted]"}</span>
                )}
              </div>
              <div className="w-[45%]">
                <h1>{(items.book?.desc || items.title || "").slice(0, 50)}...</h1>
              </div>
              <div className="w-[9%]">
                {(() => {
                  const unitPrice = items.price || items.book?.price || 0;
                  const qty = items.quantity || 1;
                  return <h1>₹ {unitPrice * qty}</h1>;
                })()}
              </div>
              <div className="w-[9%]">
                <h1>{items.quantity || 1}</h1>
              </div>
              <div className="w-[16%]">
                <h1 className="font-semibold text-green-500">
                  {items.status === "Order Placed" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Canceled" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
