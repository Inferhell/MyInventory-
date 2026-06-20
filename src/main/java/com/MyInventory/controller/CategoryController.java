package com.myinventory.controller;

import com.myinventory.dto.CategoryResponse;
import com.myinventory.dto.CreateCategoryRequest;
import com.myinventory.dto.UpdateCategoryRequest;
import com.myinventory.service.CategoryService;
import java.util.List;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse createCategory(
            @Valid @RequestBody CreateCategoryRequest request) {

        return categoryService.createCategory(request);
    }

    @GetMapping
    public List<CategoryResponse> getAllCategories() {

        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
public CategoryResponse getCategoryById(
        @PathVariable Long id) {

    return categoryService.getCategoryById(id);
}

@PutMapping("/{id}")
public CategoryResponse updateCategory(
        @PathVariable Long id,
        @Valid @RequestBody UpdateCategoryRequest request) {

    return categoryService.updateCategory(
            id,
            request
    );
}

@PatchMapping("/{id}/disable")
@ResponseStatus(HttpStatus.NO_CONTENT)
public void disableCategory(
        @PathVariable Long id) {

    categoryService.disableCategory(id);
}
}