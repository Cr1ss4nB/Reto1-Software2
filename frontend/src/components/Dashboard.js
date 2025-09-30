import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/apiService';

const Dashboard = () => {
  const { user } = useAuth();
  const [services, setServices] = useState({
    gateway: false,
    login: false,
    user: false,
    order: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Dashboard mounted, skipping service check for now...');
    // checkServices(); // Deshabilitado temporalmente
    setLoading(false);
  }, []);

  const checkServices = async () => {
    console.log('Dashboard - Starting service health check...');
    setLoading(true);
    try {
      const serviceStatus = await apiService.checkServiceHealth();
      console.log('Dashboard - Service status received:', serviceStatus);
      setServices(serviceStatus);
    } catch (error) {
      console.error('Dashboard - Error verificando servicios:', error);
    } finally {
      setLoading(false);
      console.log('Dashboard - Service health check completed');
    }
  };

  const getServiceStatus = (status) => {
    return status ? 'online' : 'offline';
  };

  const getServiceStatusText = (status) => {
    return status ? 'En línea' : 'Fuera de línea';
  };

  return (
    <div>
      <h2>Dashboard del Sistema</h2>
      <p>Bienvenido al sistema de gestión de pedidos, <strong>{user?.customerId}</strong></p>

      <div className="dashboard-grid">
        {/* Estado de Servicios */}
        <div className="dashboard-card">
          <h3>Estado de Servicios</h3>
          {loading ? (
            <p>Cargando estado de servicios...</p>
          ) : (
            <ul className="service-list">
              <li>
                <span>
                  <span className={`status-indicator status-${getServiceStatus(services.gateway)}`}></span>
                  API Gateway
                </span>
                <span>{getServiceStatusText(services.gateway)}</span>
              </li>
              <li>
                <span>
                  <span className={`status-indicator status-${getServiceStatus(services.login)}`}></span>
                  Login Service
                </span>
                <span>{getServiceStatusText(services.login)}</span>
              </li>
              <li>
                <span>
                  <span className={`status-indicator status-${getServiceStatus(services.user)}`}></span>
                  User Management
                </span>
                <span>{getServiceStatusText(services.user)}</span>
              </li>
              <li>
                <span>
                  <span className={`status-indicator status-${getServiceStatus(services.order)}`}></span>
                  Order Management
                </span>
                <span>{getServiceStatusText(services.order)}</span>
              </li>
            </ul>
          )}
          <button className="btn btn-secondary" onClick={checkServices}>
            Actualizar Estado
          </button>
        </div>

        {/* Información del Usuario */}
        <div className="dashboard-card">
          <h3>Información del Usuario</h3>
          <p><strong>ID de Cliente:</strong> {user?.customerId}</p>
          <p><strong>Estado:</strong> Autenticado</p>
          <p><strong>Token JWT:</strong> Activo</p>
        </div>

        {/* Funcionalidades Disponibles */}
        <div className="dashboard-card">
          <h3>Funcionalidades Disponibles</h3>
          <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
            <li>✅ Autenticación de usuarios</li>
            <li>✅ Gestión de sesiones JWT</li>
            <li>⏳ Gestión de clientes (próximamente)</li>
            <li>⏳ Gestión de pedidos (próximamente)</li>
          </ul>
        </div>

        {/* Información Técnica */}
        <div className="dashboard-card">
          <h3>Información Técnica</h3>
          <p><strong>Frontend:</strong> React 18</p>
          <p><strong>Backend:</strong> Spring Boot 3.5.6</p>
          <p><strong>Gateway:</strong> Spring Cloud Gateway</p>
          <p><strong>Service Discovery:</strong> Eureka Server</p>
          <p><strong>Autenticación:</strong> JWT Centralizado</p>
        </div>
      </div>

      {/* Sección de Pruebas de API */}
      <div className="card" style={{ marginTop: '30px' }}>
        <h3>Pruebas de API</h3>
        <p>Utiliza las herramientas de desarrollador del navegador para ver las peticiones HTTP.</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="btn" 
            onClick={() => {
              console.log('Probando autenticación...');
              apiService.login('test123', 'password123')
                .then(response => console.log('Login exitoso:', response.data))
                .catch(error => console.error('Error en login:', error));
            }}
          >
            Probar Login
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => {
              console.log('Verificando estado de servicios...');
              apiService.checkServiceHealth()
                .then(response => console.log('Estado de servicios:', response))
                .catch(error => console.error('Error verificando servicios:', error));
            }}
          >
            Verificar Servicios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
