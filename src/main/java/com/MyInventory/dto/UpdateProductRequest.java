package com.myinventory.dto;

import lombok.Data;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Positive;

@Data
public class UpdateProductRequest {

    @NotBlank(
            message = "El nombre es obligatorio"
    )
    private String name;

    @Size(
            max = 300,
            message = "La descripción no puede superar los 300 caracteres"
    )
    private String description;

    @NotNull(
            message = "El precio es obligatorio"
    )
    @Positive(
            message = "El precio debe ser mayor que cero"
    )
    private BigDecimal price;

    @NotNull(
            message = "La categoría es obligatoria"
    )
    private Long categoryId;

    @NotNull(
            message = "El proveedor es obligatorio"
    )
    private Long supplierId;
}