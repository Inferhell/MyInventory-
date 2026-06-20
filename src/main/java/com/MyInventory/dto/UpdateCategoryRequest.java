package com.myinventory.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateCategoryRequest(

        @NotBlank(message = "El nombre es obligatorio")
        String name,

        String description,

        boolean active

) {
}