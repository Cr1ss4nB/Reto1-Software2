import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container clearfix">
        <h1>Sistema de Gestión de Pedidos</h1>
        {isAuthenticated && (
          <div className="nav-links">
            <span>Bienvenido, {user?.customerId}</span>
            <button 
              className="btn btn-secondary" 
              onClick={logout}
              style={{ marginLeft: '20px' }}
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
