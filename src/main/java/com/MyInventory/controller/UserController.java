package com.myinventory.controller;

import com.myinventory.dto.CreateUserRequest;
import com.myinventory.dto.UpdateUserRequest;
import com.myinventory.dto.UserResponse;
import com.myinventory.service.UserService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PreAuthorize("hasAuthority('USER_READ')")
    @GetMapping
    public List<UserResponse> getAllUsers() {

        return userService.getAllUsers();
    }

    @PreAuthorize("hasAuthority('USER_READ')")
    @GetMapping("/{id}")
    public UserResponse getUserById(
            @PathVariable Long id
    ) {

        return userService.getUserById(id);
    }

    @PreAuthorize("hasAuthority('USER_CREATE')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(
            @Valid @RequestBody CreateUserRequest request
    ) {

        return userService.createUser(request);
    }

    @PreAuthorize("hasAuthority('USER_EDIT')")
    @PutMapping("/{id}")
    public UserResponse updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request
    ) {

        return userService.updateUser(
                id,
                request
        );
    }

    @PreAuthorize("hasAuthority('USER_STATUS_CHANGE')")
    @PatchMapping("/{id}/disable")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void disableUser(
            @PathVariable Long id,
            Authentication authentication
    ) {

        userService.disableUser(
                id,
                authentication.getName()
        );
    }

    @PreAuthorize("hasAuthority('USER_STATUS_CHANGE')")
    @PatchMapping("/{id}/enable")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void enableUser(
            @PathVariable Long id
    ) {

        userService.enableUser(id);
    }
}