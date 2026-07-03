package com.myinventory.repository;

import com.myinventory.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository
        extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);

    boolean existsByName(String name);

    boolean existsByNameAndIdNot(
            String name,
            Long id
    );

    List<Category> findByActiveTrue();

    Long countByActiveTrue();

    Optional<Category> findByIdAndActiveTrue(Long id);
}