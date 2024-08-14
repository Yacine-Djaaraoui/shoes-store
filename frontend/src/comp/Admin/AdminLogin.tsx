// src/components/LoginAdmin.tsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoginAdmin: React.FC = () => {
  const navigate = useNavigate(); // Using useNavigate hook from react-router-dom

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  useAuth();
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/admin/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("adminToken", token); // Store token in localStorage

      // Redirect to products route after successful login
      navigate("/admin");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-custom-height ">
      <div className=" border border-black p-10 rounded-3xl ">
        <h2 className="mb-5 text-center text-button-color-100 font-extrabold text-3xl">
          Admin Login
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="flex flex-col gap-1 mb-4 justify-center items-center ">
            <label>Email</label>
            <input
              className=" outline-none border rounded-2xl px-10 border-primary-color-100 text-center bg-[#f6f6f6] py-2  "
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1 outline-none justify-center items-center ">
            <label>Password</label>
            <input
              className=" mb-9 border rounded-2xl px-10 border-primary-color-100 text-center bg-[#f6f6f6] py-2  "
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className=" w-full py-2 bg-transparent text-primary-color-100 border rounded-2xl px-10 border-primary-color-100 hover:bg-button-color-100 hover:text-white font-bold  "
            type="submit"
          >
            Login
          </button>
          {error && <p className="text-red-600 mt-1">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
