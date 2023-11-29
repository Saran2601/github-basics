package com.newproject.mobilestore.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newproject.mobilestore.models.Admin;
import com.newproject.mobilestore.models.Login;
import com.newproject.mobilestore.services.Admin_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/admin")
public class Admin_controller {
    @Autowired
    Admin_service admin_service;

    @PostMapping("signup")
    public ResponseEntity<?> Signup(@RequestBody Admin data) {
        try {
            boolean val = admin_service.Register(data);
            if (val) {
                return ResponseEntity.status(HttpStatus.CREATED).body("Admin registered successfully");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
            }

        } catch (Exception e) {
            System.out.println(e);

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request body");

        }
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Login data) {

        try {
            String jwttoken = admin_service.Login(data);

            if (jwttoken != null) {
                JwtResponse jwtResponse = new JwtResponse(jwttoken);
                return ResponseEntity.ok(jwtResponse);
            } else {
                // Authentication failed, return an error response
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed. Invalid email or password.");
            }
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request body");

        }

    }
}
