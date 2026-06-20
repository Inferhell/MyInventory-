package com.myinventory.dto;

import com.myinventory.model.Role;

public record UserResponse(

        Long id,

        String name,

        String email,

        Role role,

        boolean active

) {
}