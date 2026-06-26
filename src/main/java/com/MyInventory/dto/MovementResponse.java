package com.myinventory.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MovementResponse {

    private Long id;

    private Long productId;

    private String productName;

    private String categoryName;

    private String supplierName;

    private Integer quantity;

    private Integer currentStock;

    private String type;

    private String observation;

    private LocalDateTime createdAt;

    private Long userId;

    private String userName;
}