import { createContext, useState, useEffect, useContext } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in (on page refresh)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Register function
  const register = async (formData) => {
    try {
      const res = await API.post("/users/register", formData);
      // After successful registration, fetch user data
      const userRes = await API.get("/users/me");
      setUser(userRes.data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  // Login function
  const login = async (formData) => {
    try {
      const res = await API.post("/users/login", formData);
      // After successful login, fetch user data
      const userRes = await API.get("/users/me");
      setUser(userRes.data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await API.post("/users/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);