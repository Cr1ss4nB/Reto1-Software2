package co.edu.uptc.loginmicroservice.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String customerId;
    private String password;
}
