package com.myinventory.controller;

import com.myinventory.model.Product;
import com.myinventory.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    
    @PostMapping
    public Product save(@RequestBody Product product){
        return productService.save(product);
    }

    @GetMapping
    public List<Product> findAll(){
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public Product findById(@PathVariable Long id){
        return productService.findById(id);
    }
    

}