package com.myinventory.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UpdateSupplierRequest(

        @NotBlank(message = "El nombre es obligatorio")
        String name,

        @NotBlank(message = "El teléfono es obligatorio")
        String phone,

        @Email(message = "Correo inválido")
        @NotBlank(message = "El correo es obligatorio")
        String email,

        @NotBlank(message = "La dirección es obligatoria")
        String address

) {
}