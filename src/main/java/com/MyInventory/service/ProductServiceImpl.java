package com.myinventory.service;

import com.myinventory.dto.CreateProductRequest;
import com.myinventory.dto.ProductResponse;
import com.myinventory.dto.UpdateProductRequest;
import com.myinventory.exception.ResourceNotFoundException;
import com.myinventory.model.Category;
import com.myinventory.model.Product;
import com.myinventory.model.Supplier;
import com.myinventory.repository.CategoryRepository;
import com.myinventory.repository.ProductRepository;
import com.myinventory.repository.SupplierRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;

    public ProductServiceImpl(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            SupplierRepository supplierRepository
    ) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
    }

    @Override
    public ProductResponse create(
            CreateProductRequest request
    ) {

        Category category = categoryRepository
                .findByIdAndActiveTrue(
                        request.getCategoryId()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Categoría no encontrada o inactiva"
                        )
                );

        Supplier supplier = supplierRepository
                .findByIdAndActiveTrue(
                        request.getSupplierId()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Proveedor no encontrado o inactivo"
                        )
                );

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .category(category)
                .supplier(supplier)
                .active(true)
                .build();

        Product saved =
                productRepository.save(product);

        return toResponse(saved);
    }

    @Override
    public List<ProductResponse> getAll() {

        return productRepository
                .findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public ProductResponse getById(
            Long id
    ) {

        Product product = productRepository
                .findByIdAndActiveTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Producto no encontrado"
                        )
                );

        return toResponse(product);
    }

    @Override
    public ProductResponse update(
            Long id,
            UpdateProductRequest request
    ) {

        Product existing = getProductEntity(id);

        Category category = categoryRepository
                .findByIdAndActiveTrue(
                        request.getCategoryId()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Categoría no encontrada o inactiva"
                        )
                );

        Supplier supplier = supplierRepository
                .findByIdAndActiveTrue(
                        request.getSupplierId()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Proveedor no encontrado o inactivo"
                        )
                );

        existing.setName(request.getName());
        existing.setDescription(request.getDescription());
        existing.setPrice(request.getPrice());
        existing.setStock(request.getStock());
        existing.setCategory(category);
        existing.setSupplier(supplier);

        Product updated =
                productRepository.save(existing);

        return toResponse(updated);
    }

    @Override
    public void disable(
            Long id
    ) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Producto no encontrado"
                                )
                        );

        product.setActive(false);

        productRepository.save(product);
    }

    @Override
    public void enable(
            Long id
    ) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Producto no encontrado"
                                )
                        );

        product.setActive(true);

        productRepository.save(product);
    }

    private Product getProductEntity(
            Long id
    ) {

        return productRepository
                .findByIdAndActiveTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Producto no encontrado o inactivo"
                        )
                );
    }

    private ProductResponse toResponse(
            Product product
    ) {

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .active(product.isActive())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())

                .categoryId(
                        product.getCategory() != null
                                ? product.getCategory().getId()
                                : null
                )

                .categoryName(
                        product.getCategory() != null
                                ? product.getCategory().getName()
                                : null
                )

                .supplierId(
                        product.getSupplier() != null
                                ? product.getSupplier().getId()
                                : null
                )

                .supplierName(
                        product.getSupplier() != null
                                ? product.getSupplier().getName()
                                : null
                )

                .build();
    }
}