package com.myinventory.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DashboardResponse {

    private Long totalProducts;

    private Long totalCategories;

    private Long totalSuppliers;

    private Long totalMovements;

    private Long totalEntries;

    private Long totalExits;

    private Long totalStock;

    private List<DashboardRecentMovementResponse> recentMovements;

    private List<DashboardLowStockProductResponse> lowStockProducts;
}
