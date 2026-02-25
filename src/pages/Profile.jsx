import React, { useEffect, useState } from "react";
import Sidebar from "../componets/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../componets/Loader/Loader";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  // Headers with proper string interpolation
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "https://bookora-backend-4nea.onrender.com/api/v1/get-user-information",
          { headers }
        );
        setUserInfo(response.data);
        //console.log("Fetched user:", response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      {!userInfo ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row flex-1 px-2 md:px-12 py-8 gap-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/6">
            <Sidebar data={userInfo} />
          </div>

          {/* Main Content (Favourites, Settings, etc.) */}
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;