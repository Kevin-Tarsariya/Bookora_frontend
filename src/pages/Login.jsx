import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" }); 
  };

  const validate = () => {
    const newErrors = {};
    if (!values.username.trim()) newErrors.username = "Username is required";
    if (!values.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:3000/api/v1/sign-in", values);

      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));

      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/profile");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials or server error.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-zinc-800 rounded-lg px-6 py-8 w-full max-w-md">
        <p className="text-zinc-200 text-2xl text-center">Log In</p>
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-200">Or</p>
        <p className="mt-2 text-center text-zinc-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;