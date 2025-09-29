package co.edu.uptc.loginmicroservice.service;

import co.edu.uptc.loginmicroservice.domain.User;
import co.edu.uptc.loginmicroservice.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(User user) {
        userRepository.save(user);
    }

    public boolean authenticateUser(String customerId, String password) {
        return userRepository.findByCustomerAndPassword(customerId, password).isPresent();
    }
}
