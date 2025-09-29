package co.edu.uptc.loginmicroservice.controller;

import co.edu.uptc.loginmicroservice.domain.User;
import co.edu.uptc.loginmicroservice.dto.LoginRequest;
import co.edu.uptc.loginmicroservice.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/createuser")
    public String createUser(@RequestBody User user) {
        userService.createUser(user);
        return "Usuario creado exitosamente";
    }

    @PostMapping("/authuser")
    public boolean authUser(@RequestBody LoginRequest request) {
        return userService.authenticateUser(request.getCustomerId(), request.getPassword());
    }
}
