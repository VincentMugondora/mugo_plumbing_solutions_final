import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

// Add these test URLs at the top of your component
const TEST_URLS = [
  'http://localhost:5000/api/v1/login',
];

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (response.ok && data?.user) {
        setUser(data.user);
        return { success: true, user: data.user };
      }
      
      return {
        success: false,
        errors: data?.error 
          ? { general: data.error }
          : { general: `Server error: ${response.status}` }
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        errors: { general: 'Network error occurred' }
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 