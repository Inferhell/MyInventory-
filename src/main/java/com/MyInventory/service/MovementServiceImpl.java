package com.myinventory.service;

import com.myinventory.dto.CreateMovementRequest;
import com.myinventory.dto.MovementResponse;
import com.myinventory.exception.ResourceNotFoundException;
import com.myinventory.model.Movement;
import com.myinventory.model.MovementType;
import com.myinventory.model.Product;
import com.myinventory.model.User;
import com.myinventory.repository.MovementRepository;
import com.myinventory.repository.ProductRepository;
import com.myinventory.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MovementServiceImpl implements MovementService {

    private final MovementRepository movementRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    @Override
    public MovementResponse registerEntry(
            CreateMovementRequest request
    ) {

        Product product = productRepository
                .findByIdAndActiveTrue(
                        request.getProductId()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Producto no encontrado o inactivo"
                        )
                );

        User user = getAuthenticatedUser();

        product.setStock(
                product.getStock()
                        + request.getQuantity()
        );

        Product updatedProduct =
                productRepository.save(product);

        Movement movement = Movement.builder()
                .user(user)
                .product(updatedProduct)
                .quantity(request.getQuantity())
                .type(MovementType.ENTRY)
                .observation(normalizeObservation(
                        request.getObservation()
                ))
                .build();

        Movement saved =
                movementRepository.save(movement);

        return toResponse(saved);
    }

    @Override
    public MovementResponse registerExit(
            CreateMovementRequest request
    ) {

        Product product = productRepository
                .findByIdAndActiveTrue(
                        request.getProductId()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Producto no encontrado o inactivo"
                        )
                );

        User user = getAuthenticatedUser();

        if (product.getStock() < request.getQuantity()) {

            throw new RuntimeException(
                    "Stock insuficiente. Stock actual: "
                            + product.getStock()
            );
        }

        product.setStock(
                product.getStock()
                        - request.getQuantity()
        );

        Product updatedProduct =
                productRepository.save(product);

        Movement movement = Movement.builder()
                .user(user)
                .product(updatedProduct)
                .quantity(request.getQuantity())
                .type(MovementType.EXIT)
                .observation(normalizeObservation(
                        request.getObservation()
                ))
                .build();

        Movement saved =
                movementRepository.save(movement);

        return toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MovementResponse> findAll() {

        return movementRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
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

    private MovementResponse toResponse(
            Movement movement
    ) {

        Product product =
                movement.getProduct();

        return MovementResponse.builder()
                .id(movement.getId())

                .productId(
                        product != null
                                ? product.getId()
                                : null
                )

                .productName(
                        product != null
                                ? product.getName()
                                : null
                )

                .categoryName(
                        product != null
                                && product.getCategory() != null
                                ? product.getCategory().getName()
                                : null
                )

                .supplierName(
                        product != null
                                && product.getSupplier() != null
                                ? product.getSupplier().getName()
                                : null
                )

                .quantity(movement.getQuantity())

                .currentStock(
                        product != null
                                ? product.getStock()
                                : null
                )

                .type(movement.getType().name())

                .observation(movement.getObservation())

                .createdAt(movement.getCreatedAt())

                .userId(
                        movement.getUser() != null
                                ? movement.getUser().getId()
                                : null
                )

                .userName(
                        movement.getUser() != null
                                ? movement.getUser().getName()
                                : null
                )

                .build();
    }

    private String normalizeObservation(
            String observation
    ) {

        if (observation == null) {
            return "";
        }

        return observation.trim();
    }
}