package com.myinventory.service;

import com.myinventory.dto.DashboardResponse;
import com.myinventory.model.MovementType;
import com.myinventory.repository.CategoryRepository;
import com.myinventory.repository.MovementRepository;
import com.myinventory.repository.ProductRepository;
import com.myinventory.repository.SupplierRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl
        implements DashboardService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    private final MovementRepository movementRepository;

    public DashboardServiceImpl(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            SupplierRepository supplierRepository,
            MovementRepository movementRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
        this.movementRepository = movementRepository;
    }

    @Override
    public DashboardResponse getDashboard() {

        return DashboardResponse.builder()

                .totalProducts(
                        productRepository.count()
                )

                .totalCategories(
                        categoryRepository.count()
                )

                .totalSuppliers(
                        supplierRepository.count()
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

                .build();
    }
}