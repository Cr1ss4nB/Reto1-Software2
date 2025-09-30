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
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('customerId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const apiService = {
  // Configurar token de autenticación
  setAuthToken: (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
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

  // Servicios de pedidos (cuando estén disponibles)
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
    const services = {
      gateway: false,
      login: false,
      user: false,
      order: false
    };

    try {
      // Verificar gateway - usar endpoint que existe
      await api.get('/login/authuser', {
        data: { customerId: 'test', password: 'test' }
      });
      services.gateway = true;
    } catch (error) {
      // Si devuelve 401, el gateway está funcionando pero las credenciales son inválidas
      if (error.response?.status === 401) {
        services.gateway = true;
      } else {
        console.log('Gateway no disponible:', error.message);
      }
    }

    try {
      // Verificar login service - hacer una petición de prueba
      await api.post('/login/authuser', { customerId: 'test', password: 'test' });
      services.login = true;
    } catch (error) {
      // Si devuelve 401, el servicio está funcionando pero las credenciales son inválidas
      if (error.response?.status === 401) {
        services.login = true;
      } else {
        console.log('Login service no disponible:', error.message);
      }
    }

    return services;
  }
};

export default apiService;
