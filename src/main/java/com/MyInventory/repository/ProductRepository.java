package com.myinventory.repository;

import com.myinventory.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    List<Product> findByActiveTrue();

    Optional<Product> findByIdAndActiveTrue(Long id);

    long countByActiveTrue();

    long countByCategoryIdAndActiveTrue(Long categoryId);

    long countBySupplierIdAndActiveTrue(Long supplierId);

    List<Product> findTop5ByActiveTrueAndStockLessThanEqualOrderByStockAsc(
            Integer stock
    );

    @Query("""
            SELECT COALESCE(SUM(p.stock), 0)
            FROM Product p
            WHERE p.active = true
            """)
    Long getTotalStock();
}
