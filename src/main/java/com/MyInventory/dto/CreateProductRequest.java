package com.myinventory.dto;

import lombok.Data;

import java.math.BigDecimal;

import jakarta.validation.constraints.*;

@Data
public class CreateProductRequest {

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
    @Digits(
            integer = 10,
            fraction = 2,
            message = "Formato de precio inválido"
    )
    private BigDecimal price;

    @NotNull(
            message = "El stock es obligatorio"
    )
    @Min(
            value = 0,
            message = "El stock no puede ser negativo"
    )
    private Integer stock;

    @NotNull(
            message = "La categoría es obligatoria"
    )
    private Long categoryId;

    @NotNull(
            message = "El proveedor es obligatorio"
    )
    private Long supplierId;
}