package com.myinventory.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardResponse {

    private Long totalProducts;

    private Long totalCategories;

    private Long totalSuppliers;

    private Long totalMovements;

    private Long totalEntries;

    private Long totalExits;

    private Integer totalStock;
}