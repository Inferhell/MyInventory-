package com.myinventory.dto;

import com.myinventory.model.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateUserRequest(

        @NotBlank
        String name,

        @Email
        @NotBlank
        String email,

        @NotBlank
        String password,

        @NotNull
        Role role

) {
}
