package com.example.demo;

public class CarModel {
    private Long id;
    private String name;
    private int range; // Räckvidd i kilometer

    public CarModel(Long id, String name, int range) {
        this.id = id;
        this.name = name;
        this.range = range;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRange() {
        return range;
    }

    public void setRange(int range) {
        this.range = range;
    }
}