package com.myinventory.service;

import com.myinventory.model.User;
import com.myinventory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public User createUser(User user) {

    if (userRepository.existsByEmail(user.getEmail())) {
        throw new RuntimeException("Email already exists");
    }

    user.setPassword(
            passwordEncoder.encode(user.getPassword())
    );

    return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
   @Override
public void changePassword(
        String email,
        String currentPassword,
        String newPassword) {

    if (newPassword.length() < 8) {
        throw new RuntimeException(
                "La nueva contraseña debe tener al menos 8 caracteres"
        );
    }

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("Usuario no encontrado"));

    boolean matches = passwordEncoder.matches(
            currentPassword,
            user.getPassword()
    );

    if (!matches) {
        throw new RuntimeException(
                "La contraseña actual es incorrecta"
        );
    }

    user.setPassword(
            passwordEncoder.encode(newPassword)
    );

    userRepository.save(user);
}
}