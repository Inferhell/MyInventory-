package com.myinventory.controller;

import com.myinventory.dto.CreateProductRequest;
import com.myinventory.dto.ProductResponse;
import com.myinventory.model.Product;
import com.myinventory.service.ProductService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    
    @PostMapping
public ProductResponse save(
       @Valid @RequestBody CreateProductRequest request){

    return productService.save(request);
}

    @GetMapping
    public List<Product> findAll(){
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id){

    Product product = productService.findById(id);

    if(product == null){
         return ResponseEntity.notFound().build();
    }

     return ResponseEntity.ok(product);
    }
    @PutMapping("/{id}")
    public Product update(
        @PathVariable Long id,
        @RequestBody Product product) {

    return productService.update(id, product);
}

    @PatchMapping("/{id}/disable")
    public void disable(@PathVariable Long id) {

    productService.disable(id);
}

}