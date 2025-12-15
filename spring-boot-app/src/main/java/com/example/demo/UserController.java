package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        userRepository.save(user); // Spara användaren i databasen

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
        Optional<User> foundUser = userRepository.findByUsername(user.getUsername());
        if (foundUser.isPresent() && foundUser.get().getPassword().equals(user.getPassword())) {
            // Anta att du har en metod för att hämta bilmodellens detaljer
            CarModel carModel = getCarModelDetails(foundUser.get().getCarModel());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful!");
            response.put("carModel", carModel.getName());
            response.put("range", carModel.getRange()); // Lägg till räckvidd

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials!"));
        }
    }

    private CarModel getCarModelDetails(String carModelName) {
        // Här skulle jag hämta bilmodellens detaljer, möjligtvis från en databas
        // Här exempel med hårdkodade värden
        if ("Tesla Model S".equals(carModelName)) {
            return new CarModel(1L, "Tesla Model S", 600);
        } else if ("Nissan Leaf".equals(carModelName)) {
            return new CarModel(2L, "Nissan Leaf", 240);
        } else if ("Chevrolet Bolt".equals(carModelName)) {
            return new CarModel(3L, "Chevrolet Bolt", 380);
        }
        // Om bilmodellen inte hittas, returnera en standardmodell eller hantera felet
        return new CarModel(0L, "Unknown Model", 0);
    }
}