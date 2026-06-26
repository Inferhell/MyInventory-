package com.myinventory.service;

import com.myinventory.dto.DashboardResponse;
import com.myinventory.model.MovementType;
import com.myinventory.repository.CategoryRepository;
import com.myinventory.repository.MovementRepository;
import com.myinventory.repository.ProductRepository;
import com.myinventory.repository.SupplierRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class DashboardServiceImpl
        implements DashboardService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    private final MovementRepository movementRepository;

   

    @Override
    public DashboardResponse getDashboard() {

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

                .build();
    }
}