package co.edu.uptc.loginmicroservice.controller;

import co.edu.uptc.loginmicroservice.config.JwtUtil;
import co.edu.uptc.loginmicroservice.domain.User;
import co.edu.uptc.loginmicroservice.dto.LoginRequest;
import co.edu.uptc.loginmicroservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/createuser")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario creado exitosamente");
    }

    @PostMapping("/authuser")
    public ResponseEntity<Map<String,Object>> authUser(@RequestBody LoginRequest request) {
        boolean valid= userService.authenticateUser(request.getCustomerId(), request.getPassword());
        Map<String,Object> response = new HashMap<>();
        if (valid) {
           String token = jwtUtil.generateToken(request.getCustomerId());
           response.put("autenticated", true);
           response.put("token", token);
        }else {
            response.put("autenticated", false);
            response.put("message", "Credenciales inválidas");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
