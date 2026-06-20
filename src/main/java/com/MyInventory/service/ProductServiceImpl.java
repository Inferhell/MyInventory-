package com.myinventory.service;


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
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> findAll() {
    return productRepository.findByActiveTrue();
}

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
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