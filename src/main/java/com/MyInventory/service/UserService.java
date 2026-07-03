package com.myinventory.service;

import com.myinventory.dto.ChangePasswordRequest;
import com.myinventory.dto.CreateUserRequest;
import com.myinventory.dto.UpdateUserRequest;
import com.myinventory.dto.UserResponse;
import com.myinventory.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Optional<User> findByEmail(String email);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    UserResponse createUser(
            CreateUserRequest request
    );

    UserResponse updateUser(
            Long id,
            UpdateUserRequest request
    );

    void disableUser(
            Long id,
            String currentUserEmail
    );

    void enableUser(Long id);

    void changePassword(
            String email,
            ChangePasswordRequest request
    );
}