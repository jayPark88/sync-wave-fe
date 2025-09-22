import React, { createContext, useState, useEffect } from 'react';
import axios from '../util/axiosInstance';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');

    if (token && userEmail) {
      setUser({ email: userEmail });
    }
    setLoading(false);
  }, []);

  const login = async (userId, password) => {
    try {
      const response = await axios.post('/v1/auth/login', { userId, password });
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', userId);
      setUser({ email: userId });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 