package com.myinventory.service;

import java.util.List;
import java.util.Optional;

import com.myinventory.dto.CreateUserRequest;
import com.myinventory.dto.UpdateUserRequest;
import com.myinventory.dto.UserResponse;
import com.myinventory.model.User;

public interface UserService {

    Optional<User> findByEmail(String email);

    UserResponse createUser(
            CreateUserRequest request);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    UserResponse updateUser(
            Long id,
            UpdateUserRequest request);

    void disableUser(Long id);

    void enableUser(Long id);

    void changePassword(
            String email,
            String currentPassword,
            String newPassword);
}