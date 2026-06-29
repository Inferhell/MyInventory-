package com.myinventory.service;

import com.myinventory.dto.CreateProductRequest;
import com.myinventory.dto.ProductResponse;
import com.myinventory.dto.UpdateProductRequest;
import com.myinventory.exception.ResourceNotFoundException;
import com.myinventory.model.Category;
import com.myinventory.model.Movement;
import com.myinventory.model.MovementType;
import com.myinventory.model.Product;
import com.myinventory.model.Supplier;
import com.myinventory.model.User;
import com.myinventory.repository.CategoryRepository;
import com.myinventory.repository.MovementRepository;
import com.myinventory.repository.ProductRepository;
import com.myinventory.repository.SupplierRepository;
import com.myinventory.repository.UserRepository;
import com.myinventory.exception.InactiveResourceException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    private final MovementRepository movementRepository;
    private final UserRepository userRepository;

    public ProductServiceImpl(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            SupplierRepository supplierRepository,
            MovementRepository movementRepository,
            UserRepository userRepository
    ) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
        this.movementRepository = movementRepository;
        this.userRepository = userRepository;
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

        if (saved.getStock() > 0) {

            Movement initialMovement = Movement.builder()
                    .user(getAuthenticatedUser())
                    .product(saved)
                    .quantity(saved.getStock())
                    .stockBefore(0)
                    .stockAfter(saved.getStock())
                    .type(MovementType.INITIAL_BALANCE)
                    .observation("Stock inicial del producto")
                    .build();

            movementRepository.save(initialMovement);
        }

        return toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAll() {

        return productRepository
                .findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
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
public void enable(Long id) {

    Product product =
            productRepository.findById(id)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Producto no encontrado"
                            )
                    );

    if (
            product.getCategory() == null
                    || !product.getCategory().isActive()
    ) {

        throw new InactiveResourceException(
                "No se puede reactivar el producto porque su categoría está inactiva"
        );
    }

    if (
            product.getSupplier() == null
                    || !product.getSupplier().isActive()
    ) {

        throw new InactiveResourceException(
                "No se puede reactivar el producto porque su proveedor está inactivo"
        );
    }

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

    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuario no encontrado"
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