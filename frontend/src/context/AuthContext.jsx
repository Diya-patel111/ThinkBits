import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Re-hydrate user state if token exists on load
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // This route hits our protected '/auth/me' endpoint
          const res = await api.get('/auth/me');
          setUser(res.data.user);
        } catch (_error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const register = async (email, password, role) => {
    const res = await api.post('/auth/register', { email, password, role });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };
  
  const googleLogin = async (tokenId) => {
    const res = await api.post('/auth/google', { tokenId });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, googleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};