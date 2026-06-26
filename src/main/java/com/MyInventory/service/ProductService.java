package com.myinventory.service;

import com.myinventory.dto.CreateProductRequest;
import com.myinventory.dto.ProductResponse;
import com.myinventory.dto.UpdateProductRequest;

import java.util.List;

public interface ProductService {

    List<ProductResponse> getAll();

    ProductResponse getById(Long id);

    ProductResponse create(
            CreateProductRequest request);

    ProductResponse update(
            Long id,
            UpdateProductRequest request);

    void disable(Long id);

    void enable(Long id);
}