package com.myinventory.dto;

import lombok.Data;

import java.math.BigDecimal;

import jakarta.validation.constraints.*;

@Data
public class CreateProductRequest {

    @NotBlank
    private String name;

    private String description;

    @NotNull
    @Positive
    private BigDecimal price;

    @NotNull
    @Min(0)
    private Integer stock;

    private Long categoryId;

    
    
}