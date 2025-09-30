# Configuración del Reto - Ingeniería de Software II

## ✅ Microservicios Implementados

### 1. LoginMicroservice (Java - Spring Boot)
- **Puerto**: 8081
- **Base de datos**: MySQL (CustomerDB)
- **Endpoints implementados**:
  - `POST /login/createuser` - Registrar usuario del sistema
  - `POST /login/authuser` - Autenticar usuario del sistema

#### Parámetros de Invocación:
- **createuser**:
  - `customerid: String`
  - `password: String`
  - Retorno: Ninguna (HTTP 201)

- **authuser**:
  - `customerid: String`
  - `password: String`
  - Retorno: `{userCreated: boolean, token: string}`

### 2. Eureka Server (Java - Spring Boot)
- **Puerto**: 8761
- **Función**: Registro y descubrimiento de servicios
- **URL Dashboard**: http://localhost:8761

### 3. API Gateway (Java - Spring Boot)
- **Puerto**: 8080
- **Funciones**:
  - Enrutamiento centralizado
  - Autenticación JWT centralizada
  - Configuración CORS
  - Balanceador de carga

## 🔧 Configuración JWT Centralizada

El JWT está centralizado en el **Gateway** con las siguientes características:

- **JwtUtil**: Generación y validación de tokens
- **JwtAuthenticationFilter**: Filtro de autenticación para todas las rutas
- **SecurityConfig**: Configuración de seguridad con CORS
- **CorsConfig**: Configuración de CORS para permitir peticiones cross-origin

## 🌐 Rutas Configuradas en el Gateway

- `/login/**` → Login Microservice (permitido sin autenticación)
- `/user/**` → User Microservice (requiere autenticación)
- `/order/**` → Order Microservice (requiere autenticación)
- `/eureka/**` → Eureka Server (permitido sin autenticación)

## 📊 Estructura de Datos

### Customer (CustomerDB)
- **Tabla**: Customer
- **Campos**:
  - `document` (String)
  - `firstname` (String)
  - `lastname` (String)
  - `address` (String)
  - `phone` (String)
  - `email` (String)

### User (CustomerDB)
- **Tabla**: users
- **Campos**:
  - `customerId` (String) - Primary Key
  - `password` (String) - Encriptada con BCrypt

## 🚀 Cómo Ejecutar

### Opción 1: Script Automático
```bash
test-services.bat
```

### Opción 2: Manual
```bash
# Terminal 1 - Eureka Server
cd eureka
mvn spring-boot:run

# Terminal 2 - Gateway
cd gateway
mvn spring-boot:run

# Terminal 3 - Login Microservice
cd loginMicroservice
mvn spring-boot:run
```

## 🧪 Pruebas

### Script de Prueba de Login
```bash
test-login-endpoints.bat
```

### Pruebas Manuales con cURL

1. **Crear Usuario**:
```bash
curl -X POST http://localhost:8080/login/createuser \
  -H "Content-Type: application/json" \
  -d '{"customerid":"test123","password":"password123"}'
```

2. **Autenticar Usuario**:
```bash
curl -X POST http://localhost:8080/login/authuser \
  -H "Content-Type: application/json" \
  -d '{"customerid":"test123","password":"password123"}'
```

## 📋 Estado del Proyecto

### ✅ Completado
- [x] Eureka Server configurado
- [x] API Gateway con JWT centralizado
- [x] CORS configurado
- [x] Login Microservice con endpoints correctos
- [x] Configuración de seguridad
- [x] Scripts de prueba

### 🔄 Pendiente (Para otros miembros del equipo)
- [ ] UserMgmtMicroservice (gestión de clientes)
- [ ] OrderMgmtMicroservice (gestión de pedidos)
- [ ] Frontend
- [ ] Diagramas de arquitectura
- [ ] Manual técnico

## 🔑 Configuración de Base de Datos

### MySQL (CustomerDB)
- **Host**: localhost:3306
- **Database**: CustomerDB
- **Username**: loginUser
- **Password**: Login123.

## 📝 Notas Importantes

1. **JWT Centralizado**: Toda la autenticación JWT se maneja en el Gateway
2. **CORS**: Configurado para permitir peticiones desde cualquier origen
3. **Service Discovery**: Todos los microservicios se registran en Eureka
4. **Load Balancing**: El Gateway distribuye la carga entre instancias de microservicios
5. **Seguridad**: Las rutas de login están exentas de autenticación JWT
