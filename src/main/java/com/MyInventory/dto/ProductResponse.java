package com.myinventory.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ProductResponse {

    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    private Integer stock;

    private boolean active;

    private Long categoryId;

    private String categoryName;

    private Long supplierId;

    private String supplierName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}