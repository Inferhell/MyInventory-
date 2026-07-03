package com.myinventory.repository;

import com.myinventory.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SupplierRepository
        extends JpaRepository<Supplier, Long> {

    Optional<Supplier> findByName(String name);

    boolean existsByName(String name);

    boolean existsByEmail(String email);

    boolean existsByNameAndIdNot(
            String name,
            Long id
    );

    boolean existsByEmailAndIdNot(
            String email,
            Long id
    );

    List<Supplier> findByActiveTrue();

    Long countByActiveTrue();

    Optional<Supplier> findByIdAndActiveTrue(Long id);
}