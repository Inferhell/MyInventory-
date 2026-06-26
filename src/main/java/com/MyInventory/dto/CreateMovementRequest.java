package com.myinventory.dto;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class CreateMovementRequest {

@NotNull(message = "El producto es obligatorio")
private Long productId;

@NotNull(message = "La cantidad es obligatoria")
@Positive(message = "La cantidad debe ser mayor que cero")
private Integer quantity;

@Size(
        max = 500,
        message = "La observación no puede superar los 500 caracteres"
)
private String observation;

}