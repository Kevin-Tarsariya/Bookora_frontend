import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [profileData, setProfileData] = useState(null);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    address: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/get-user-information", {
          headers,
        });
        const data = res.data;
        setProfileData(data);
        setFormValues({
          username: data.username || "",
          email: data.email || "",
          address: data.address || "",
          avatar: data.avatar || "",
        });
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUser();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formValues.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !formValues.email.includes("@") ||
      !formValues.email.includes(".") ||
      !formValues.email.endsWith(".com")
    ) {
      newErrors.email = "Please enter a valid email (must include @ and end with .com)";
    }

    if (!formValues.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formValues.avatar.trim()) {
      newErrors.avatar = "Avatar URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async () => {
    if (!validateForm()) return; 

    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/update-profile",
        formValues,
        { headers }
      );
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
    }
  };

  if (!profileData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-12 py-8 text-zinc-100 h-auto min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-500 mb-8 text-center md:text-left">
        Settings
      </h1>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={formValues.avatar}
          alt="Avatar Preview"
          className="w-24 h-24 rounded-full border border-gray-500"
        />
        <label className="mt-3 text-sm w-full max-w-md">Avatar URL</label>
        <input
          type="text"
          name="avatar"
          value={formValues.avatar}
          onChange={handleChange}
          className="mt-1 p-2 rounded bg-zinc-800 text-white w-full max-w-md"
        />
        {errors.avatar && (
          <p className="text-red-400 text-sm mt-1">{errors.avatar}</p>
        )}
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-zinc-800 text-white w-full"
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <label className="text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-zinc-800 text-white w-full"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Address Section */}
      <div className="mt-6">
        <label className="text-sm">Address</label>
        <textarea
          name="address"
          value={formValues.address}
          onChange={handleChange}
          rows="4"
          className="mt-1 p-2 rounded bg-zinc-800 text-white w-full"
        />
        {errors.address && (
          <p className="text-red-400 text-sm mt-1">{errors.address}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center md:justify-end">
        <button
          className="bg-yellow-500 text-zinc-900 font-semibold px-5 py-2 rounded hover:bg-yellow-400 transition"
          onClick={handleSubmit}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Settings;
