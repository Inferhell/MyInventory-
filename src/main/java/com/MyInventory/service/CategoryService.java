package com.myinventory.service;

import com.myinventory.dto.CategoryResponse;
import com.myinventory.dto.CreateCategoryRequest;
import com.myinventory.dto.UpdateCategoryRequest;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategoryById(Long id);

    CategoryResponse createCategory(
            CreateCategoryRequest request
    );

    CategoryResponse updateCategory(
            Long id,
            UpdateCategoryRequest request
    );

    void disableCategory(Long id);

    void enableCategory(Long id);
}