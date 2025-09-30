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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Inicializar estado basado en localStorage
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');
    console.log('AuthContext initial state - token:', !!token, 'customerId:', customerId);
    return !!token;
  });
  const [user, setUser] = useState(() => {
    const customerId = localStorage.getItem('customerId');
    return customerId ? { customerId } : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Solo verificar una vez al montar
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');
    console.log('AuthContext useEffect - Checking stored auth:', { token: !!token, customerId });
    
    if (token && customerId) {
      apiService.setAuthToken(token);
      setIsAuthenticated(true);
      setUser({ customerId });
      console.log('AuthContext useEffect - User authenticated from storage');
    }
    setLoading(false);
  }, []);

  const login = async (customerId, password) => {
    try {
      console.log('LOGIN START - customerId:', customerId);
      const response = await apiService.login(customerId, password);
      console.log('LOGIN RESPONSE:', response.data);
      
      if (response.data && response.data.userCreated && response.data.token) {
        const token = response.data.token;
        console.log('LOGIN SUCCESS - Setting auth state');
        
        // Guardar en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('customerId', customerId);
        
        // Configurar API service
        apiService.setAuthToken(token);
        
        // Establecer estado
        setIsAuthenticated(true);
        setUser({ customerId });
        
        console.log('LOGIN COMPLETE - isAuthenticated:', true, 'user:', { customerId });
        return { success: true };
      } else {
        console.log('LOGIN FAILED - Invalid response');
        return { success: false, message: 'Credenciales inválidas' };
      }
    } catch (error) {
      console.error('LOGIN ERROR:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error de conexión'
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

  console.log('AuthContext RENDER - isAuthenticated:', isAuthenticated, 'user:', user, 'loading:', loading);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
