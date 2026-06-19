package com.myinventory.service;

import com.myinventory.model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {

    User createUser(User user);

    Optional<User> findByEmail(String email);

    List<User> getAllUsers();

    void changePassword(
        String email,
        String currentPassword,
        String newPassword
);
}
