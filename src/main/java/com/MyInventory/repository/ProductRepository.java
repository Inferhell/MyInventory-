package com.myinventory.repository;

import com.myinventory.model.Product;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByName(String name);

    boolean existsByName(String name);

    List<Product> findByActiveTrue();

    Optional<Product> findByIdAndActiveTrue(Long id);

    @Query("""
            SELECT COALESCE(SUM(p.stock),0)
            FROM Product p
            WHERE p.active = true
            """)
            Integer getTotalStock();
}