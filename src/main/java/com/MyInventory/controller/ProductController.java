package com.myinventory.controller;

import com.myinventory.dto.CreateProductRequest;
import com.myinventory.dto.ProductResponse;
import com.myinventory.dto.UpdateProductRequest;
import com.myinventory.service.ProductService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(
            ProductService productService) {

        this.productService = productService;
    }

    @PostMapping
    public ProductResponse create(
            @Valid
            @RequestBody
            CreateProductRequest request) {

        return productService.create(request);
    }

    @GetMapping
    public List<ProductResponse> getAll() {

        return productService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(
            @PathVariable Long id) {

        ProductResponse product =
                productService.getById(id);

        return ResponseEntity.ok(product);
    }

    @PutMapping("/{id}")
    public ProductResponse update(
            @PathVariable Long id,
            @Valid
            @RequestBody
            UpdateProductRequest request) {

        return productService.update(
                id,
                request
        );
    }

    @PatchMapping("/{id}/disable")
    public void disable(
            @PathVariable Long id) {

        productService.disable(id);
    }

    @PatchMapping("/{id}/enable")
    public void enable(
            @PathVariable Long id) {

        productService.enable(id);
    }
}