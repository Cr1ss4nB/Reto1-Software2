package co.edu.uptc.loginmicroservice.controller;

import co.edu.uptc.loginmicroservice.domain.User;
import co.edu.uptc.loginmicroservice.service.UserService;
import org.springframework.web.bind.annotation.RequestBody;

public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public String createUser(@RequestBody User user) {
        userService.createUser(user);
        return "Usuario creado exitosamente";
    }


}
