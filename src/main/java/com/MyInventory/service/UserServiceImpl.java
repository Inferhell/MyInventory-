package com.myinventory.service;

import com.myinventory.dto.CreateUserRequest;
import com.myinventory.dto.UpdateUserRequest;
import com.myinventory.dto.UserResponse;
import com.myinventory.model.User;
import com.myinventory.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserResponse createUser(
            CreateUserRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException(
                    "Email already exists"
            );
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(
                        passwordEncoder.encode(
                                request.password()
                        )
                )
                .role(request.role())
                .active(true)
                .build();

        User savedUser = userRepository.save(user);

        return toResponse(savedUser);
    }

    @Override
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

@Override
public UserResponse getUserById(Long id) {

    User user = userRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Usuario no encontrado"
                    ));

    return toResponse(user);
}

  @Override
public UserResponse updateUser(
        Long id,
        UpdateUserRequest request) {

    User user = userRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Usuario no encontrado"
                    ));

    Optional<User> existingUser =
            userRepository.findByEmail(request.email());

    if (existingUser.isPresent()
            && !existingUser.get().getId().equals(id)) {

        throw new RuntimeException(
                "El email ya está en uso"
        );
    }

    user.setName(request.name());
    user.setEmail(request.email());
    user.setRole(request.role());
    user.setActive(request.active());

    User updatedUser = userRepository.save(user);

    return toResponse(updatedUser);
}

    @Override
    public void disableUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Usuario no encontrado"
                        ));

        user.setActive(false);

        userRepository.save(user);
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
                        new RuntimeException(
                                "Usuario no encontrado"
                        ));

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

    private UserResponse toResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.isActive()
        );
    }
}