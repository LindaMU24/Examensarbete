package com.example.demo;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(String username, String password, String carModel) {
        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(username, hashedPassword, carModel);
        // Spara användaren i databasen
        return user;
    }
}