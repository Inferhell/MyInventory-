package com.myinventory.service;

import com.myinventory.dto.DashboardLowStockProductResponse;
import com.myinventory.dto.DashboardRecentMovementResponse;
import com.myinventory.dto.DashboardResponse;
import com.myinventory.model.Movement;
import com.myinventory.model.MovementType;
import com.myinventory.model.Product;
import com.myinventory.repository.CategoryRepository;
import com.myinventory.repository.MovementRepository;
import com.myinventory.repository.ProductRepository;
import com.myinventory.repository.SupplierRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DashboardServiceImpl
        implements DashboardService {

    private static final int LOW_STOCK_LIMIT = 5;

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    private final MovementRepository movementRepository;

    @Override
    public DashboardResponse getDashboard() {

        List<DashboardRecentMovementResponse> recentMovements =
                movementRepository.findTop5ByOrderByCreatedAtDesc()
                        .stream()
                        .map(this::mapRecentMovement)
                        .toList();

        List<DashboardLowStockProductResponse> lowStockProducts =
                productRepository
                        .findTop5ByActiveTrueAndStockLessThanEqualOrderByStockAsc(
                                LOW_STOCK_LIMIT
                        )
                        .stream()
                        .map(this::mapLowStockProduct)
                        .toList();

        return DashboardResponse.builder()

                .totalProducts(
                        productRepository.countByActiveTrue()
                )

                .totalCategories(
                        categoryRepository.countByActiveTrue()
                )

                .totalSuppliers(
                        supplierRepository.countByActiveTrue()
                )

                .totalMovements(
                        movementRepository.count()
                )

                .totalEntries(
                        movementRepository.countByType(
                                MovementType.ENTRY
                        )
                )

                .totalExits(
                        movementRepository.countByType(
                                MovementType.EXIT
                        )
                )

                .totalStock(
                        productRepository.getTotalStock()
                )

                .recentMovements(recentMovements)

                .lowStockProducts(lowStockProducts)

                .build();
    }

    private DashboardRecentMovementResponse mapRecentMovement(
            Movement movement
    ) {

        return new DashboardRecentMovementResponse(
                movement.getId(),
                movement.getProduct() != null
                        ? movement.getProduct().getName()
                        : "-",
                movement.getType(),
                movement.getQuantity(),
                movement.getStockBefore(),
                movement.getStockAfter(),
                movement.getUser() != null
                        ? movement.getUser().getName()
                        : "-",
                movement.getCreatedAt()
        );
    }

    private DashboardLowStockProductResponse mapLowStockProduct(
            Product product
    ) {

        return new DashboardLowStockProductResponse(
                product.getId(),
                product.getName(),
                product.getStock(),
                product.getCategory() != null
                        ? product.getCategory().getName()
                        : "-",
                product.getSupplier() != null
                        ? product.getSupplier().getName()
                        : "-"
        );
    }
}
