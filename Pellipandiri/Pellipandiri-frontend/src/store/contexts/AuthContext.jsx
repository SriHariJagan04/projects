import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  // Load saved user on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save token to localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Save user to localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // ------------------------------------------------
  // SIGNUP
  // ------------------------------------------------
  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });

      setToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // LOGIN
  // ------------------------------------------------
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      setToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // LOGOUT
  // ------------------------------------------------
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
