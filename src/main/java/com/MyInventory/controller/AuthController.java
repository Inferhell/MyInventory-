package com.myinventory.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.myinventory.dto.ChangePasswordRequest;
import com.myinventory.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

 

    @GetMapping("/me")
    public Map<String, Object> me(Authentication authentication) {

        return Map.of(
                "email", authentication.getName(),
                "authorities", authentication.getAuthorities()
        );
    }
   
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(

            Authentication authentication,

            @Valid
            @RequestBody
            ChangePasswordRequest request) {

        userService.changePassword(
                authentication.getName(),
                request.currentPassword(),
                request.newPassword()
        );

        return ResponseEntity.ok(
                "Contraseña actualizada correctamente"
        );
    }
}