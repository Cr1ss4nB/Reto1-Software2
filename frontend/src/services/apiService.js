import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('API Request interceptor - Token from localStorage:', token ? 'Present' : 'Missing');
    console.log('API Request interceptor - URL:', config.url);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API Request interceptor - Authorization header set');
    } else {
      console.log('API Request interceptor - No token found, request will be unauthorized');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas de error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Error 401 - Token inválido o expirado');
      // Limpiar localStorage y redirigir solo si no estamos en login
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/') {
        localStorage.removeItem('token');
        localStorage.removeItem('customerId');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

const apiService = {
  // Configurar token de autenticación
  setAuthToken: (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('API Service - Token set in defaults headers:', token.substring(0, 20) + '...');
    } else {
      delete api.defaults.headers.common['Authorization'];
      console.log('API Service - Token removed from defaults headers');
    }
  },

  // Servicios de autenticación
  login: (customerId, password) => {
    return api.post('/login/authuser', { customerId, password });
  },

  register: (customerId, password) => {
    return api.post('/login/createuser', { customerId, password });
  },

  // Servicios de clientes (cuando estén disponibles)
  getCustomers: () => {
    return api.get('/customer/findcustomerbyid');
  },

  createCustomer: (customerData) => {
    return api.post('/customer/createcustomer', customerData);
  },

  // Servicios de pedidos a través del Gateway
  getOrders: (customerId) => {
    return api.get(`/order/findorderbycustomerid?customerid=${customerId}`);
  },

  createOrder: (orderData) => {
    return api.post('/order/createorder', orderData);
  },

  updateOrderStatus: (orderId, status) => {
    return api.put('/order/updateorderstatus', { orderId, status });
  },

  // Verificar estado de servicios
  checkServiceHealth: async () => {
    // Simplemente asumir que están funcionando si llegamos al dashboard
    const services = {
      gateway: true,   // Si el login funciona, el gateway está funcionando
      login: true,     // Si el login funciona, el login service está funcionando
      user: false,     // No implementado aún
      order: false     // No implementado aún
    };

    console.log('Servicios verificados - Gateway y Login asumidos como online (login exitoso)');
    return services;
  }
};

export default apiService;
