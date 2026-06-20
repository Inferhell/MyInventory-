package com.myinventory.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateCategoryRequest(

        @NotBlank(message = "El nombre es obligatorio")
        String name,

        String description

) {
}