package com.myinventory.dto;

import lombok.Data;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Min;

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