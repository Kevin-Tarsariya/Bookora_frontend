import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../componets/Loader/Loader";
import { FaUser, FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState();
    const [editingIndex, setEditingIndex] = useState(-1);
    const [statusUpdates, setStatusUpdates] = useState({});
    const [userDetailVisible, setUserDetailVisible] = useState(false);
    const [userDetailData, setUserDetailData] = useState(null);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/get-all-orders", { headers });
            setAllOrders(response.data.data);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = (index, value) => {
        setStatusUpdates((prev) => ({ ...prev, [index]: value }));
    };

    const updateStatus = async (orderId, index) => {
        const newStatus = statusUpdates[index];

        if (!newStatus) {
            alert("Please select a status before updating.");
            return;
        }

        try {
            await axios.put(
                `http://localhost:3000/api/v1/update-status/${orderId}`, 
                { status: newStatus },
                { headers }
            );

            alert("Status updated successfully.");
            fetchOrders(); // refresh updated data
            setEditingIndex(-1); // close edit mode
        } catch (err) {
            console.error("Failed to update status:", err);
            alert("Failed to update status. Please try again.");
        }
    };


    return (
        <>
            {!allOrders ? (
                <div className="h-full flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <div className="h-full p-4 text-zinc-100">
                    <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                        Your Order History
                    </h1>

                    <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 font-semibold text-zinc-500">
                        <div className="w-[3%] text-center">Sr.</div>
                        <div className="w-[22%]">Books</div>
                        <div className="w-[43%]">Description</div>
                        <div className="w-[11%]">Price</div>
                        <div className="w-[6%]">Qty</div>
                        <div className="w-[16%]">Status</div>
                        <div className="hidden md:block w-[5%] text-center"><FaUser /></div>
                    </div>

                    {allOrders.map((order, i) => {
                        const book = order.book;
                        const status = order.status;
                        const isEditing = editingIndex === i;

                        return (
                            <div
                                key={order._id || i}
                                className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 items-center hover:bg-zinc-900 transition-all duration-300"
                            >
                                <div className="w-[3%] text-center">{i + 1}</div>

                                <div className="w-[40%] md:w-[22%] text-blue-300 hover:underline">
                                    {book ? (
                                        <Link to={`/view-book-details/${book._id}`}>
                                            {book.title}
                                        </Link>
                                    ) : (
                                        <span className="text-red-500">[Book Deleted]</span>
                                    )}
                                </div>

                                <div className="w-0 md:w-[45%] hidden md:block">
                                    {book?.desc ? `${book.desc.slice(0, 50)}...` : "No description available"}
                                </div>

                                <div className="w-[17%] md:w-[9%] ml-20">
                                    {(() => {
                                        const unitPrice = order.price || book?.price || 0;
                                        const qty = order.quantity || 1;
                                        return <span>₹ {unitPrice * qty}</span>;
                                    })()}
                                </div>

                                <div className="w-[6%] ml-12">
                                    <span>{order.quantity || 1}</span>
                                </div>

                                <div className="w-[30%] md:w-[20%]">
                                    {isEditing ? (
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <select
                                                className="bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-white flex-1 min-w-[120px]"
                                                onChange={(e) => handleStatusChange(i, e.target.value)}
                                                defaultValue={status}
                                            >
                                                {["Order Placed", "Out for delivery", "Delivered", "Canceled"].map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => updateStatus(order._id, i)}
                                                className="text-green-500 hover:text-green-400 text-lg flex-shrink-0"
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setEditingIndex(i)}
                                            className={`font-semibold text-sm md:text-base ${status === "Order Placed"
                                                    ? "text-yellow-500"
                                                    : status === "Canceled"
                                                        ? "text-red-500"
                                                        : "text-green-500"
                                                } hover:scale-105 transition-all duration-300`}
                                        >
                                            {status}
                                        </button>
                                    )}
                                </div>

                                <div className="w-[10%] md:w-[8%] text-center">
                                    <button
                                        className="text-xl hover:text-orange-500"
                                        onClick={() => {
                                            setUserDetailVisible(true);
                                            setUserDetailData(order.user);
                                        }}
                                    >
                                        <IoOpenOutline />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {userDetailVisible && userDetailData && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-50 flex items-center justify-center">
                    <div className="bg-zinc-900 p-6 rounded shadow-lg text-white w-[90%] md:w-[400px] relative">
                        <button
                            className="absolute top-2 right-4 text-zinc-400 hover:text-red-400 text-xl"
                            onClick={() => {
                                setUserDetailVisible(false);
                                setUserDetailData(null);
                            }}
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-4">User Details</h2>
                        <p><strong>Username:</strong> {userDetailData.username}</p>
                        <p><strong>Email:</strong> {userDetailData.email}</p>
                        <p><strong>Address:</strong> {userDetailData.address || "N/A"}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllOrders;
