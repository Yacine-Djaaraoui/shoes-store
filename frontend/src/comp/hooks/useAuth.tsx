// src/hooks/useAuth.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate(); // Using useNavigate hook from react-router-dom

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/login"); // Redirect to login if token is not found
    }
  }, [navigate]); // Include navigate in dependencies array

  return true; // Return true or other authentication state if needed
};

export default useAuth;
