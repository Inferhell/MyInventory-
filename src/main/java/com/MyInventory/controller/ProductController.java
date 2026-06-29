package com.myinventory.controller;

import com.myinventory.dto.CreateProductRequest;
import com.myinventory.dto.ProductResponse;
import com.myinventory.dto.UpdateProductRequest;
import com.myinventory.service.ProductService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PreAuthorize("hasAuthority('PRODUCT_READ')")
    @GetMapping
    public List<ProductResponse> getAll() {

        return productService.getAll();
    }

    @PreAuthorize("hasAuthority('PRODUCT_READ')")
    @GetMapping("/{id}")
    public ProductResponse getById(
            @PathVariable Long id
    ) {

        return productService.getById(id);
    }

    @PreAuthorize("hasAuthority('PRODUCT_WRITE')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse create(
            @Valid @RequestBody CreateProductRequest request
    ) {

        return productService.create(request);
    }

    @PreAuthorize("hasAuthority('PRODUCT_WRITE')")
    @PutMapping("/{id}")
    public ProductResponse update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProductRequest request
    ) {

        return productService.update(
                id,
                request
        );
    }

    @PreAuthorize("hasAuthority('PRODUCT_STATUS_CHANGE')")
    @PatchMapping("/{id}/disable")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void disable(
            @PathVariable Long id
    ) {

        productService.disable(id);
    }

    @PreAuthorize("hasAuthority('PRODUCT_STATUS_CHANGE')")
    @PatchMapping("/{id}/enable")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void enable(
            @PathVariable Long id
    ) {

        productService.enable(id);
    }
}