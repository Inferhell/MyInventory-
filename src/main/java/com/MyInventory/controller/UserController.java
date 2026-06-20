package com.myinventory.controller;

import com.myinventory.dto.CreateUserRequest;
import com.myinventory.dto.UpdateUserRequest;
import com.myinventory.dto.UserResponse;
import com.myinventory.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
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
        @Valid @RequestBody CreateUserRequest request) {
    return userService.createUser(request);
}

@PutMapping("/{id}")
public UserResponse updateUser(

        @PathVariable Long id,

        @Valid
        @RequestBody UpdateUserRequest request) {

    return userService.updateUser(id, request);
}

@DeleteMapping("/{id}")
public ResponseEntity<String> disableUser(
        @PathVariable Long id) {

    userService.disableUser(id);

    return ResponseEntity.ok(
            "Usuario desactivado correctamente"
    );
}
}



