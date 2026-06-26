package com.myinventory.controller;

import com.myinventory.dto.CreateUserRequest;
import com.myinventory.dto.UpdateUserRequest;
import com.myinventory.dto.UserResponse;
import com.myinventory.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserResponse> getAllUsers() {

        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserResponse getUserById(
            @PathVariable Long id) {

        return userService.getUserById(id);
    }

    @PostMapping
    public UserResponse createUser(
            @Valid
            @RequestBody CreateUserRequest request) {

        return userService.createUser(request);
    }

    @PutMapping("/{id}")
    public UserResponse updateUser(

            @PathVariable Long id,

            @Valid
            @RequestBody UpdateUserRequest request) {

        return userService.updateUser(
                id,
                request
        );
    }

    @PutMapping("/{id}/enable")
    public ResponseEntity<String> enableUser(
            @PathVariable Long id) {

        userService.enableUser(id);

        return ResponseEntity.ok(
                "Usuario reactivado"
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> disableUser(
            @PathVariable Long id,
            Authentication authentication) {

        UserResponse user =
                userService.getUserById(id);

        String currentUser =
                authentication.getName();

        if (
                user.email().equals(
                        currentUser
                )
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "No puedes desactivar tu propia cuenta"
                    );
        }

        userService.disableUser(id);

        return ResponseEntity.ok(
                "Usuario desactivado correctamente"
        );
    }
}