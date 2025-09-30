import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar la aplicación
    const token = localStorage.getItem('token');
    if (token) {
      apiService.setAuthToken(token);
      setIsAuthenticated(true);
      setUser({ customerId: localStorage.getItem('customerId') });
    }
    setLoading(false);
  }, []);

  const login = async (customerId, password) => {
    try {
      const response = await apiService.login(customerId, password);
      console.log('Login response:', response.data);
      
      if (response.data && response.data.userCreated) {
        const token = response.data.token;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('customerId', customerId);
          apiService.setAuthToken(token);
          setIsAuthenticated(true);
          setUser({ customerId });
          return { success: true };
        } else {
          return { success: false, message: 'Token no recibido del servidor' };
        }
      } else {
        return { success: false, message: 'Credenciales inválidas' };
      }
    } catch (error) {
      console.error('Error en login:', error);
      let errorMessage = 'Error de conexión';
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Credenciales inválidas';
        } else if (error.response.status === 500) {
          errorMessage = 'Error del servidor. Intente más tarde.';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { 
        success: false, 
        message: errorMessage
      };
    }
  };

  const register = async (customerId, password) => {
    try {
      await apiService.register(customerId, password);
      return { success: true, message: 'Usuario registrado exitosamente' };
    } catch (error) {
      console.error('Error en registro:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al registrar usuario' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customerId');
    apiService.setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
