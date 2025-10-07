# Reto4 - Ecosistema de Microservicios Integrado

Este proyecto implementa un ecosistema completo de microservicios para la gestión de órdenes y usuarios con integración total entre servicios.

## 🏗️ Arquitectura

El proyecto está compuesto por los siguientes microservicios integrados:

1. **Eureka Server** (Puerto 8761) - Servidor de descubrimiento de servicios
2. **API Gateway** (Puerto 8080) - Punto de entrada único con enrutamiento inteligente
3. **Login Microservice** (Puerto 8081) - Autenticación y autorización JWT
4. **User Management Microservice** (Puerto 8083) - Gestión completa de usuarios/clientes
5. **Order Management Microservice** (Puerto 8082) - Gestión de órdenes
6. **Frontend** (Puerto 3000) - Interfaz de usuario React con integración completa

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Recomendado)
```bash
# Iniciar todos los servicios
start-services.bat

# Detener todos los servicios
stop-services.bat
```

### Opción 2: Inicio Manual
```bash
# 1. Eureka Server
cd eureka && mvn spring-boot:run

# 2. User Management Service (Go)
cd userMgmtMicroservice && go run main.go

# 3. Login Microservice
cd loginMicroservice && mvn spring-boot:run

# 4. API Gateway
cd gateway && mvn spring-boot:run

# 5. Order Management Service (Python)
cd orderMgmtMicroservice && python main.py

# 6. Frontend
cd frontend && npm start
```

## 🔧 Tecnologías Integradas

- **Backend**: Java (Spring Boot), Go (Gin), Python (FastAPI)
- **Frontend**: React con Context API
- **Base de Datos**: MySQL con conexiones optimizadas
- **Servicio de Descubrimiento**: Netflix Eureka con registro automático
- **API Gateway**: Spring Cloud Gateway con load balancing
- **Autenticación**: JWT con validación distribuida
- **Comunicación**: HTTP/REST con descubrimiento automático

## 📊 Servicios Disponibles

### 🌐 API Gateway (Puerto 8080)
- **Rutas Integradas**:
  - `/login/**` → Login Microservice
  - `/customer/**` → User Management Service
  - `/order/**` → Order Management Service

### 🔍 Servicios Individuales
- **Eureka Dashboard**: http://localhost:8761
- **API Gateway**: http://localhost:8080
- **Login Service**: http://localhost:8081
- **User Management Service**: http://localhost:8083
- **Order Management Service**: http://localhost:8082
- **Frontend**: http://localhost:3000

## 🔐 Autenticación Integrada

El sistema utiliza JWT para autenticación distribuida:
- **Registro**: `/login/createuser`
- **Login**: `/login/authuser`
- **Validación**: Automática en todos los servicios protegidos

## 👥 Gestión de Usuarios

### Endpoints Disponibles
- `GET /customer/findcustomerbyid?customerid={id}` - Obtener usuario
- `POST /customer/createcustomer` - Crear usuario
- `PUT /customer/updatecustomer` - Actualizar usuario

### Funcionalidades
- ✅ Registro de usuarios
- ✅ Autenticación JWT
- ✅ Gestión de perfiles
- ✅ Integración con órdenes

## 📦 Gestión de Órdenes

### Endpoints Disponibles
- `GET /order/findorderbycustomerid?customerid={id}` - Órdenes por usuario
- `POST /order/createorder` - Crear orden
- `PUT /order/updateorderstatus` - Actualizar estado

## 🎯 Características del Ecosistema

### ✅ Integración Completa
- **Descubrimiento Automático**: Todos los servicios se registran en Eureka
- **Load Balancing**: Distribución automática de carga
- **Health Checks**: Monitoreo de estado de servicios
- **Fallback**: Manejo de errores distribuido

### ✅ Seguridad
- **JWT Distribuido**: Autenticación en todos los servicios
- **CORS Configurado**: Acceso controlado desde frontend
- **Validación Centralizada**: Seguridad en el gateway

### ✅ Escalabilidad
- **Microservicios Independientes**: Escalamiento individual
- **Base de Datos Separada**: Aislamiento de datos
- **Configuración Flexible**: Variables de entorno

## 🛠️ Configuración de Base de Datos

### Bases de Datos Requeridas
```sql
-- Base de datos para login
CREATE DATABASE loginDB;
CREATE USER 'loginUser'@'localhost' IDENTIFIED BY 'Login123.';
GRANT ALL PRIVILEGES ON loginDB.* TO 'loginUser'@'localhost';

-- Base de datos para usuarios
CREATE DATABASE userdb;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON userdb.* TO 'root'@'localhost';

-- Base de datos para órdenes
CREATE DATABASE orderdb;
```

## 🚦 Estado de Servicios

El frontend incluye un dashboard que muestra el estado de todos los servicios:
- ✅ **Gateway**: Disponible
- ✅ **Login**: Disponible  
- ✅ **User Management**: Disponible
- ⏳ **Order Management**: En desarrollo

## 🔄 Flujo de Trabajo

1. **Usuario accede** al frontend (http://localhost:3000)
2. **Registro/Login** a través del API Gateway
3. **Autenticación JWT** distribuida a todos los servicios
4. **Gestión de usuarios** a través del User Management Service
5. **Creación de órdenes** vinculadas al usuario autenticado
6. **Monitoreo** del estado de servicios en tiempo real

## 🐛 Solución de Problemas

### Servicios no se registran en Eureka
- Verificar que Eureka Server esté ejecutándose en puerto 8761
- Revisar logs de cada microservicio
- Verificar conectividad de red

### Errores de autenticación
- Verificar que el JWT secret sea el mismo en todos los servicios
- Revisar headers de autorización en las peticiones

### Problemas de base de datos
- Verificar que MySQL esté ejecutándose
- Confirmar credenciales y nombres de base de datos
- Revisar logs de conexión

## 📈 Próximas Mejoras

- [ ] Implementación completa del Order Management Service
- [ ] Métricas y monitoreo con Prometheus
- [ ] Logs centralizados con ELK Stack
- [ ] CI/CD con Docker y Kubernetes
- [ ] Tests de integración automatizados

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Hacer commit de tus cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
