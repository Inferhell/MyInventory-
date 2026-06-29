package com.myinventory.service;

import com.myinventory.dto.ChangePasswordRequest;
import com.myinventory.dto.CreateUserRequest;
import com.myinventory.dto.UpdateUserRequest;
import com.myinventory.dto.UserResponse;
import com.myinventory.exception.BusinessRuleException;
import com.myinventory.exception.DuplicateResourceException;
import com.myinventory.exception.ResourceNotFoundException;
import com.myinventory.model.Role;
import com.myinventory.model.User;
import com.myinventory.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {

        return userRepository.findByEmail(
                normalizeEmail(email)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuario no encontrado"
                        )
                );

        return toResponse(user);
    }

    @Override
    public UserResponse createUser(
            CreateUserRequest request
    ) {

        String email =
                normalizeEmail(request.email());

        if (userRepository.existsByEmail(email)) {

            throw new DuplicateResourceException(
                    "El correo ya está registrado"
            );
        }

        User user = User.builder()
                .name(normalize(request.name()))
                .email(email)
                .password(
                        passwordEncoder.encode(
                                request.password()
                        )
                )
                .role(request.role())
                .active(true)
                .build();

        User savedUser =
                userRepository.save(user);

        return toResponse(savedUser);
    }

    @Override
    public UserResponse updateUser(
            Long id,
            UpdateUserRequest request
    ) {

        User user = userRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuario no encontrado o inactivo"
                        )
                );

        String newEmail =
                normalizeEmail(request.email());

        if (userRepository.existsByEmailAndIdNot(
                newEmail,
                id
        )) {

            throw new DuplicateResourceException(
                    "El correo ya está registrado"
            );
        }

        Role currentRole =
                user.getRole();

        Role newRole =
                request.role();

        if (
                currentRole == Role.ADMIN
                        && newRole != Role.ADMIN
                        && isLastActiveAdmin(user)
        ) {

            throw new BusinessRuleException(
                    "No se puede cambiar el rol del último ADMIN activo"
            );
        }

        user.setName(
                normalize(request.name())
        );

        user.setEmail(newEmail);

        user.setRole(newRole);

        User updatedUser =
                userRepository.save(user);

        return toResponse(updatedUser);
    }

    @Override
    public void disableUser(
            Long id,
            String currentUserEmail
    ) {

        User userToDisable = userRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuario no encontrado o inactivo"
                        )
                );

        String normalizedCurrentUserEmail =
                normalizeEmail(currentUserEmail);

        if (
                userToDisable.getEmail()
                        .equalsIgnoreCase(
                                normalizedCurrentUserEmail
                        )
        ) {

            throw new BusinessRuleException(
                    "No puedes desactivar tu propio usuario"
            );
        }

        if (
                userToDisable.getRole() == Role.ADMIN
                        && isLastActiveAdmin(userToDisable)
        ) {

            throw new BusinessRuleException(
                    "No se puede desactivar el último ADMIN activo"
            );
        }

        userToDisable.setActive(false);

        userRepository.save(userToDisable);
    }

    @Override
    public void enableUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuario no encontrado"
                        )
                );

        user.setActive(true);

        userRepository.save(user);
    }

    @Override
    public void changePassword(
            String email,
            ChangePasswordRequest request
    ) {

        User user = userRepository.findByEmail(
                        normalizeEmail(email)
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuario no encontrado"
                        )
                );

        if (!user.isActive()) {

            throw new BusinessRuleException(
                    "No se puede cambiar la contraseña de un usuario inactivo"
            );
        }

        if (
                !passwordEncoder.matches(
                        request.currentPassword(),
                        user.getPassword()
                )
        ) {

            throw new BusinessRuleException(
                    "La contraseña actual no es correcta"
            );
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.newPassword()
                )
        );

        userRepository.save(user);
    }

    private boolean isLastActiveAdmin(User user) {

        return user.getRole() == Role.ADMIN
                && userRepository.countByRoleAndActiveTrue(
                        Role.ADMIN
                ) <= 1;
    }

    private UserResponse toResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    private String normalize(String value) {

        if (value == null) {
            return "";
        }

        return value.trim();
    }

    private String normalizeEmail(String email) {

        if (email == null) {
            return "";
        }

        return email
                .trim()
                .toLowerCase();
    }
}