package co.edu.uptc.gateway.filter;

import co.edu.uptc.gateway.config.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationFilter implements GlobalFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();
        
        logger.debug("Processing request to path: {}", path);

        // Rutas que no requieren autenticación
        if (isPublicPath(path)) {
            logger.debug("Public path accessed: {}", path);
            return chain.filter(exchange);
        }

        // Verificar header Authorization
        String authHeader = request.getHeaders().getFirst("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.warn("No valid authorization header found for path: {}", path);
            return unauthorized(exchange);
        }

        // Extraer y validar token
        String token = authHeader.substring(7);
        boolean isValid = jwtUtil.isTokenValid(token);
        
        if (!isValid) {
            logger.warn("Invalid token provided for path: {}", path);
            return unauthorized(exchange);
        }

        // Extraer usuario del token para verificar permisos
        String customerId = jwtUtil.getSubject(token);
        logger.debug("Authenticated user: {} accessing path: {}", customerId, path);
        
        // Verificar permisos específicos por ruta y usuario
        if (!hasPermissionToAccess(path, customerId, request)) {
            logger.warn("Access denied for user: {} to path: {}", customerId, path);
            return forbidden(exchange);
        }

        logger.debug("Access granted for user: {} to path: {}", customerId, path);
        return chain.filter(exchange);
    }

    private boolean isPublicPath(String path) {
        return path.contains("/login") || 
               path.contains("/eureka") || 
               path.contains("/actuator");
    }

    /**
     * Verifica si el usuario tiene permisos para acceder a la ruta específica
     */
    private boolean hasPermissionToAccess(String path, String customerId, ServerHttpRequest request) {
        // Reglas de autorización específicas
        
        // 1. Rutas de órdenes - solo el propietario puede acceder a sus órdenes
        if (path.contains("/order/")) {
            return hasOrderPermission(path, customerId, request);
        }
        
        // 2. Rutas de clientes - solo el propietario puede acceder a su información
        if (path.contains("/customer/")) {
            return hasCustomerPermission(path, customerId, request);
        }
        
        // 3. Por defecto, permitir acceso si el token es válido
        return true;
    }

    /**
     * Verifica permisos específicos para rutas de órdenes
     */
    private boolean hasOrderPermission(String path, String customerId, ServerHttpRequest request) {
        // Si es una consulta de órdenes por customerId, verificar que coincida
        if (path.contains("findorderbycustomerid")) {
            String queryParam = request.getQueryParams().getFirst("customerid");
            if (queryParam != null) {
                boolean hasPermission = customerId.equals(queryParam);
                logger.debug("Order permission check - Token customerId: {}, Query customerId: {}, Has permission: {}", 
                           customerId, queryParam, hasPermission);
                return hasPermission;
            }
        }
        
        // Para crear órdenes, verificar que el customerId en el body coincida
        if (path.contains("createorder")) {
            // Aquí podrías verificar el body de la petición
            // Por ahora, permitir si el token es válido
            return true;
        }
        
        // Para otras operaciones de órdenes, permitir por ahora
        return true;
    }

    /**
     * Verifica permisos específicos para rutas de clientes
     */
    private boolean hasCustomerPermission(String path, String customerId, ServerHttpRequest request) {
        // Implementar lógica específica para clientes
        // Por ejemplo, solo permitir acceso a su propia información
        return true; // Por ahora permitir todo
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return response.setComplete();
    }

    private Mono<Void> forbidden(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.FORBIDDEN);
        return response.setComplete();
    }
}