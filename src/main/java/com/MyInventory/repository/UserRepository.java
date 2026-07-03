package com.myinventory.repository;

import com.myinventory.model.Role;
import com.myinventory.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(
            String email,
            Long id
    );

    Optional<User> findByIdAndActiveTrue(Long id);

    long countByRoleAndActiveTrue(Role role);
}