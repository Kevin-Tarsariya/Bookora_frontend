import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" }); 
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};

    // Username: required, alphanumeric, 3-15 chars
    if (!values.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9_]{3,15}$/.test(values.username)) {
      newErrors.username =
        "Username must be 3–15 characters and only contain letters, numbers, or _";
    }

    // Email: required, must be Gmail
    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(values.email)) {
      newErrors.email = "Only Gmail addresses are allowed";
    }

    // Password: required, min 6 chars, at least 1 uppercase & 1 number
    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(values.password)) {
      newErrors.password = "Password must include at least one uppercase letter";
    } else if (!/[0-9]/.test(values.password)) {
      newErrors.password = "Password must include at least one number";
    }

    // Address: required
    if (!values.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "https://bookora-backend-4nea.onrender.com/api/v1/sign-up",
        values
      );

      alert(response.data.message || "Account created!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-zinc-800 rounded-lg px-6 py-8 w-full max-w-md">
        <p className="text-zinc-200 text-2xl text-center">Sign Up</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="text-zinc-400">Username</label>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="username"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-zinc-400">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="xyz@gmail.com"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-zinc-400">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-zinc-400">Address</label>
            <textarea
              name="address"
              rows="3"
              value={values.address}
              onChange={handleChange}
              placeholder="address"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            Sign Up
          </button>
        </form>

        {/* Footer Links */}
        <p className="mt-6 text-center text-zinc-200">Or</p>
        <p className="mt-2 text-center text-zinc-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
