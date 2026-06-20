package com.myinventory.service;


import com.myinventory.dto.CreateProductRequest;
import com.myinventory.dto.ProductResponse;
import com.myinventory.model.Product;
import com.myinventory.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    @Override
public ProductResponse save(CreateProductRequest request) {

    Product product = Product.builder()
            .name(request.getName())
            .description(request.getDescription())
            .price(request.getPrice())
            .stock(request.getStock())
            .active(true)
            .build();

    Product saved = productRepository.save(product);

    return ProductResponse.builder()
            .id(saved.getId())
            .name(saved.getName())
            .description(saved.getDescription())
            .price(saved.getPrice())
            .stock(saved.getStock())
            .active(saved.isActive())
            .build();
}

    @Override
    public List<Product> findAll() {
    return productRepository.findByActiveTrue();
}

    @Override
public Product findById(Long id) {
    return productRepository
            .findByIdAndActiveTrue(id)
            .orElse(null);
}

    @Override
    public Product update(Long id, Product product) {

        Product existing = findById(id);

        if (existing == null) {
            return null;
        }

        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setStock(product.getStock());
        existing.setCategory(product.getCategory());

        return productRepository.save(existing);
    }

        
    @Override
    public void disable(Long id) {

        Product product = findById(id);

        if (product != null) {
            product.setActive(false);
            productRepository.save(product);
        }

    }

}