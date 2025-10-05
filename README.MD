# RETO - INGENIERÍA DE SOFTWARE II PRIMER CORTE

---

- Cristian Andrés Basto Largo 
- Andrea Katherine Bello Sotelo
- Laura Vanessa Figueredo Martinez

---

OrderMgmtMicroservice (FastAPI)

Descripción
---------
Microservicio FastAPI que gestiona órdenes. Usa Motor (async) para MongoDB en localhost:27017.

Estructura
- controller/: endpoints
- service/: lógica de negocio
- repository/: acceso a MongoDB
- dto/: Pydantic DTOs
- domain/: modelos de dominio

Endpoints
1. POST /order/createorder -> body {"customerid","orderID","status"} -> {"orderCreated": true}
2. PUT /order/updateorderstatus -> body {"orderID","status"} -> {"orderStatusUpdated": true}
3. GET /order/findorderbycustomerid?customerid=... -> list of orders

Run
1. Asegurar que MongoDB esté corriendo en localhost:27017
2. Crear y activar un entorno virtual
3. pip install -r requirements.txt
4. uvicorn main:app --host 0.0.0.0 --port 8082

Eureka
El servicio intenta registrarse en http://localhost:8761/eureka al iniciar.
