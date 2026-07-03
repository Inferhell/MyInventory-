package com.myinventory.dto;

import com.myinventory.model.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(

        @NotBlank
        String name,

        @Email
        @NotBlank
        String email,

        @NotBlank(message = "La contraseña es obligatoria")
        @Size(
        min = 8,
        message = "La contraseña debe tener al menos 8 caracteres"
        )
        String password,

        @NotNull
        Role role

) {
}
