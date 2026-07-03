package com.myinventory.dto;

import java.time.LocalDateTime;

public record SupplierResponse(

        Long id,

        String name,

        String phone,

        String email,

        String address,

        boolean active,

        LocalDateTime createdAt,

        LocalDateTime updatedAt

) {
}