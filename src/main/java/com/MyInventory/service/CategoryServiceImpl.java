package com.myinventory.service;

import com.myinventory.dto.CategoryResponse;
import com.myinventory.dto.CreateCategoryRequest;
import com.myinventory.dto.UpdateCategoryRequest;
import com.myinventory.exception.ResourceNotFoundException;
import com.myinventory.model.Category;
import com.myinventory.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public CategoryResponse getCategoryById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Categoría no encontrada"
                        )
                );

        return toResponse(category);
    }

    @Override
    public CategoryResponse createCategory(
            CreateCategoryRequest request
    ) {

        String name = request.name().trim();

        if (categoryRepository.existsByName(name)) {

            throw new RuntimeException(
                    "La categoría ya existe"
            );
        }

        Category category = Category.builder()
                .name(name)
                .description(normalizeDescription(
                        request.description()
                ))
                .active(true)
                .build();

        Category savedCategory =
                categoryRepository.save(category);

        return toResponse(savedCategory);
    }

    @Override
    public CategoryResponse updateCategory(
            Long id,
            UpdateCategoryRequest request
    ) {

        Category category = categoryRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Categoría no encontrada o inactiva"
                        )
                );

        String name = request.name().trim();

        if (categoryRepository.existsByNameAndIdNot(
                name,
                id
        )) {

            throw new RuntimeException(
                    "La categoría ya existe"
            );
        }

        category.setName(name);

        category.setDescription(
                normalizeDescription(
                        request.description()
                )
        );

        Category updatedCategory =
                categoryRepository.save(category);

        return toResponse(updatedCategory);
    }

    @Override
    public void disableCategory(Long id) {

        Category category = categoryRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Categoría no encontrada o inactiva"
                        )
                );

        category.setActive(false);

        categoryRepository.save(category);
    }

    @Override
    public void enableCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Categoría no encontrada"
                        )
                );

        category.setActive(true);

        categoryRepository.save(category);
    }

    private CategoryResponse toResponse(Category category) {

        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.isActive(),
                category.getCreatedAt(),
                category.getUpdatedAt()
        );
    }

    private String normalizeDescription(
            String description
    ) {

        if (description == null) {
            return "";
        }

        return description.trim();
    }
}