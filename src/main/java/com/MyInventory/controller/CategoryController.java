package com.myinventory.controller;

import com.myinventory.dto.CategoryResponse;
import com.myinventory.dto.CreateCategoryRequest;
import com.myinventory.dto.UpdateCategoryRequest;
import com.myinventory.service.CategoryService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PreAuthorize("hasAuthority('CATEGORY_WRITE')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse createCategory(
            @Valid @RequestBody CreateCategoryRequest request
    ) {

        return categoryService.createCategory(request);
    }
    
    @PreAuthorize("hasAuthority('CATEGORY_READ')")
    @GetMapping
    public List<CategoryResponse> getAllCategories() {

        return categoryService.getAllCategories();
    }

    @PreAuthorize("hasAuthority('CATEGORY_READ')")
    @GetMapping("/{id}")
    public CategoryResponse getCategoryById(
            @PathVariable Long id
    ) {

        return categoryService.getCategoryById(id);
    }

    @PreAuthorize("hasAuthority('CATEGORY_WRITE')")
    @PutMapping("/{id}")
    public CategoryResponse updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCategoryRequest request
    ) {

        return categoryService.updateCategory(
                id,
                request
        );
    }

    @PreAuthorize("hasAuthority('CATEGORY_STATUS_CHANGE')")
    @PatchMapping("/{id}/disable")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void disableCategory(
            @PathVariable Long id
    ) {

        categoryService.disableCategory(id);
    }

    @PreAuthorize("hasAuthority('CATEGORY_STATUS_CHANGE')")
    @PatchMapping("/{id}/enable")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void enableCategory(
            @PathVariable Long id
    ) {

        categoryService.enableCategory(id);
    }
}