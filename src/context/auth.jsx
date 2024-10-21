import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

// Buat Context
export const AuthContext = createContext();

// Provider untuk AuthContext
export const AuthProvider = ({ children }) => {
  // State untuk menyimpan status login
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  console.log(user);

  // Fungsi login
  const login = ({userData, token}) => {
    setUser(userData);
    setToken(token)
    setIsAuthenticated(true);
  };

  // Fungsi logout
  const logout = () => {
    setUser(null);
    setToken(null)
    Cookies.remove('token')
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
