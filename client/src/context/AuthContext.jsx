import { createContext, useContext, useEffect, useState } from "react";

const API_BASE = 'http://localhost:5000/api/';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD USER FROM TOKEN
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();
      
      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // 🔓 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // ADMIN CHECK
  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// HOOKS
export const useAuth = () => useContext(AuthContext);