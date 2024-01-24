package com.ssafy.chocolate.common.controller;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationController {

    @PostMapping("/api/location")
    public ResponseEntity<String> handleLocation(@RequestBody Location location) {
        System.out.println(location);
//        return "Location received: " + location.getLatitude() + ", " + location.getLongitude();
        return ResponseEntity.ok("location info sent to server!!!");
    }
}

@Getter
@Setter
@ToString
class Location {
    private double latitude;
    private double longitude;
}