package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api")
public class CarModelController {

    @GetMapping("/car-models")
    public List<CarModel> getCarModels() {
        List<CarModel> carModels = new ArrayList<>();
        carModels.add(new CarModel(1L, "Tesla Model S", 600));
        carModels.add(new CarModel(2L, "Nissan Leaf", 240));
        carModels.add(new CarModel(3L, "Chevrolet Bolt", 380));
        return carModels;
    }
}