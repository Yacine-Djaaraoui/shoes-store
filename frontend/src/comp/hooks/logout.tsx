// src/hooks/useLogout.tsx

import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return logout;
};

export default useLogout;
