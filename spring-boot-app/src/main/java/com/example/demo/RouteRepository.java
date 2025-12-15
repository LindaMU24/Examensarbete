package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RouteRepository extends JpaRepository<Route, Long> {
    // Anpassade frågemetoder kan läggas till här
}
