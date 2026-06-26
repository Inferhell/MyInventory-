package com.myinventory.dto;

import com.myinventory.model.Role;

import java.time.LocalDateTime;

public record UserResponse(

        Long id,

        String name,

        String email,

        Role role,

        boolean active,

        LocalDateTime createdAt,

        LocalDateTime updatedAt

) {
}