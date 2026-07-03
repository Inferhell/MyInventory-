package com.myinventory.controller;

import com.myinventory.dto.ChangePasswordRequest;
import com.myinventory.dto.MeResponse;
import com.myinventory.exception.ResourceNotFoundException;
import com.myinventory.model.User;
import com.myinventory.repository.UserRepository;
import com.myinventory.security.PermissionService;
import com.myinventory.service.UserService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    private final UserRepository userRepository;

    private final PermissionService permissionService;

    @GetMapping("/me")
    public MeResponse me(
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuario autenticado no encontrado"
                        )
                );

        return new MeResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.isActive(),
                permissionService.getPermissions(
                        user.getRole()
                )
        );
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request
    ) {

        userService.changePassword(
                authentication.getName(),
                request
        );

        return ResponseEntity.ok(
                "Contraseña actualizada correctamente"
        );
    }
}