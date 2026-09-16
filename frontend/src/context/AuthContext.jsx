import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (token in localStorage)
  useEffect(() => {
    const userInfo = localStorage.getItem('agrimart_user');
    if (userInfo) {
      try {
        setUser(JSON.parse(userInfo));
      } catch (error) {
        console.error('Failed to parse user info', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setUser(data);
        localStorage.setItem('agrimart_user', JSON.stringify(data));
        return { success: true, user: data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error', error);
      return { success: false, message: 'Server connection error' };
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5001/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setUser(data);
        localStorage.setItem('agrimart_user', JSON.stringify(data));
        return { success: true, user: data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Admin Login error', error);
      return { success: false, message: 'Server connection error' };
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const res = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setUser(data);
        localStorage.setItem('agrimart_user', JSON.stringify(data));
        return { success: true, user: data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Registration error', error);
      return { success: false, message: 'Server connection error' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agrimart_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, adminLogin, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
