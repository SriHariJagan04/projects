import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../store/contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const { token, logout } = useContext(AuthContext);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkToken = () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      // Optional: check token expiry (if using JWT)
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; // current time in seconds
        if (decoded.exp && decoded.exp < now) {
          logout();
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      } catch (err) {
        // Invalid token
        logout();
        setIsValid(false);
      }
    };

    checkToken();
  }, [token, logout]);

  if (isValid === null) return <div>Loading...</div>;

  if (!isValid) return <Navigate to="/auth" replace />;

  return children;
};

export default ProtectedRoute;
