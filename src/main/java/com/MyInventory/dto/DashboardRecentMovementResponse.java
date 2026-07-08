package com.myinventory.dto;

import com.myinventory.model.MovementType;

import java.time.LocalDateTime;

public record DashboardRecentMovementResponse(
        Long id,
        String productName,
        MovementType type,
        Integer quantity,
        Integer stockBefore,
        Integer stockAfter,
        String userName,
        LocalDateTime createdAt
) {
}