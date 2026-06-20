package com.myinventory.service;

import com.myinventory.dto.CreateProductRequest;
import com.myinventory.dto.ProductResponse;
import com.myinventory.model.Product;

import java.util.List;

public interface ProductService {

ProductResponse save(CreateProductRequest request);
    List<Product> findAll();

    Product findById(Long id);

    Product update(Long id, Product product);

    void disable(Long id);

    

}