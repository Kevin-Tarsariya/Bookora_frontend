import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from '../componets/Loader/Loader';
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // fetch cart once on mount
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/get-user-cart",
          { headers }
        );
        // initialize qty for each item (default 1)
        const withQty = res.data.data.map((it) => ({ ...it, qty: 1 }));
        setCart(withQty);
      } catch (error) {
        console.error("Failed to fetch cart:", error.response?.data || error.message);
      }
    };
    fetch();
  }, []);

  const deletItem = async (bookid) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      // update local cart immediately
      setCart((prev) => prev.filter((c) => c._id !== bookid));
      alert(response.data.message);
    } catch (error) {
      console.error("Remove from cart failed:", error.response?.data || error.message);
    }
  };

  // change quantity locally. Backend does not currently store qty in cart, so this is client-side only.
  const changeQty = (bookId, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id !== bookId) return item;
        const newQty = (item.qty || 1) + delta;
        return { ...item, qty: newQty < 1 ? 1 : newQty };
      })
    );
  };

  const PlaceOrder = async () => {
    try {
      // send qty along with each item; backend will continue to use _id
      const orderPayload = Cart.map((it) => ({ ...it }));
      const response = await axios.post(
        `http://localhost:3000/api/v1/place-order`,
        { order: orderPayload },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log("Order error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      const total = Cart.reduce((acc, items) => acc + (items.price * (items.qty || 1)), 0);
      setTotal(total);
    } else {
      setTotal(0);
    }
  }, [Cart]);

  return (
    <div className="bg-zinc-900 px-12 py-8 h-screen">
      {!Cart && <div className="w-full h-[100%] flex items-center justify-center"><Loader /></div>}
      {Cart && Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
            <img
              src="/empty-cart.png"
              alt="empty cart"
              className="lg:h-[50vh]"
            />
          </div>
        </div>
      )}


      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {Cart.map((items, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img
                src={items.url}
                alt=""
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {items.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {items.desc.slice(0, 65)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                  {items.desc.slice(0, 100)}...
                </p>
              </div>

              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-zinc-700 rounded px-2">
                    <button
                      className="px-2 text-zinc-200"
                      onClick={() => changeQty(items._id, -1)}
                    >
                      -
                    </button>
                    <div className="px-3 text-zinc-100">{items.qty || 1}</div>
                    <button
                      className="px-2 text-zinc-200"
                      onClick={() => changeQty(items._id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <h2 className="text-zinc-100 text-2xl font-semibold flex">
                    ₹ {items.price * (items.qty || 1)}
                  </h2>

                  <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
                    onClick={() => deletItem(items._id)}  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {Cart && Cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end ">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{Cart.length} books</h2> <h2>₹ {Total}</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
                onClick={PlaceOrder}
              >
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
