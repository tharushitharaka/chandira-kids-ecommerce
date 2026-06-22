import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ck_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('ck_user', JSON.stringify(user));
    else localStorage.removeItem('ck_user');
  }, [user]);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('ck_token', data.token);
    setUser(data.user);
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('ck_token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('ck_token');
    setUser(null);
  };

  const refreshProfile = async () => {
    const { data } = await api.get('/auth/me');
    setUser(data.user);
  };

  const value = useMemo(() => ({ user, login, register, logout, refreshProfile, isAdmin: user?.role === 'admin', isWholesale: user?.role === 'wholesale' }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
