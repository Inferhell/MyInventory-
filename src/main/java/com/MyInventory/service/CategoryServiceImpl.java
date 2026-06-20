package com.myinventory.service;

import com.myinventory.dto.CategoryResponse;
import com.myinventory.dto.CreateCategoryRequest;
import com.myinventory.dto.UpdateCategoryRequest;
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
            .map(category -> new CategoryResponse(
                    category.getId(),
                    category.getName(),
                    category.getDescription(),
                    category.isActive()
            ))
            .toList();
}

    @Override
public CategoryResponse getCategoryById(Long id) {

    Category category = categoryRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Categoría no encontrada"
                    ));

    return new CategoryResponse(
            category.getId(),
            category.getName(),
            category.getDescription(),
            category.isActive()
    );
}

   @Override
public CategoryResponse createCategory(
        CreateCategoryRequest request) {

    if (categoryRepository.existsByName(
            request.name())) {

        throw new RuntimeException(
                "La categoría ya existe"
        );
    }

    Category category = Category.builder()
            .name(request.name())
            .description(request.description())
            .build();

    Category savedCategory =
            categoryRepository.save(category);

    return new CategoryResponse(
            savedCategory.getId(),
            savedCategory.getName(),
            savedCategory.getDescription(),
            savedCategory.isActive()
    );
}

    @Override
public CategoryResponse updateCategory(
        Long id,
        UpdateCategoryRequest request) {

    Category category = categoryRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Categoría no encontrada"
                    ));

    category.setName(request.name());
    category.setDescription(request.description());
    category.setActive(request.active());

    Category updatedCategory =
            categoryRepository.save(category);

    return new CategoryResponse(
            updatedCategory.getId(),
            updatedCategory.getName(),
            updatedCategory.getDescription(),
            updatedCategory.isActive()
    );
}

    @Override
public void disableCategory(Long id) {

    Category category = categoryRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Categoría no encontrada"
                    ));

    category.setActive(false);

    categoryRepository.save(category);
}

    
}