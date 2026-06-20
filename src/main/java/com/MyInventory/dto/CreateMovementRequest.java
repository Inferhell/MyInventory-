package com.myinventory.dto;

import lombok.Data;

@Data
public class CreateMovementRequest {

    private Long productId;

    private Integer quantity;

    private String observation;

}