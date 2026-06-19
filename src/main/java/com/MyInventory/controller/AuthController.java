package com.myinventory.controller;

import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/me")
    public Map<String, Object> me(Authentication authentication) {

        return Map.of(
                "email", authentication.getName(),
                "authorities", authentication.getAuthorities()
        );
    }
}