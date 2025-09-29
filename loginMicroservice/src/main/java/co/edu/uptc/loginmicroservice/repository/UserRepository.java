package co.edu.uptc.loginmicroservice.repository;

import co.edu.uptc.loginmicroservice.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findByCustomerAndPassword(String customerId, String password);
}
