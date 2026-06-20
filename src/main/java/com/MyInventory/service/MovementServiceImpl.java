package com.myinventory.service;

import com.myinventory.dto.CreateMovementRequest;
import com.myinventory.dto.MovementResponse;
import com.myinventory.model.*;
import com.myinventory.repository.MovementRepository;
import com.myinventory.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MovementServiceImpl implements MovementService {

    private final MovementRepository movementRepository;
    private final ProductRepository productRepository;

    public MovementServiceImpl(
            MovementRepository movementRepository,
            ProductRepository productRepository) {

        this.movementRepository = movementRepository;
        this.productRepository = productRepository;
    }

    @Override
    public MovementResponse registerEntry(CreateMovementRequest request) {

        Product product = productRepository
                .findById(request.getProductId())
                .orElse(null);

        if (product == null) {
            return null;
        }

        product.setStock(
                product.getStock() + request.getQuantity()
        );

        productRepository.save(product);

        Movement movement = Movement.builder()
                .product(product)
                .quantity(request.getQuantity())
                .type(MovementType.ENTRY)
                .observation(request.getObservation())
                .createdAt(LocalDateTime.now())
                .build();

        Movement saved =
        movementRepository.save(movement);

        return toResponse(saved);
    }

    @Override
    public MovementResponse registerExit(CreateMovementRequest request) {

        Product product = productRepository
                .findById(request.getProductId())
                .orElse(null);

        if (product == null) {
            return null;
        }

        if (product.getStock() < request.getQuantity()) {
            return null;
        }

        product.setStock(
                product.getStock() - request.getQuantity()
        );

        productRepository.save(product);

        Movement movement = Movement.builder()
                .product(product)
                .quantity(request.getQuantity())
                .type(MovementType.EXIT)
                .observation(request.getObservation())
                .createdAt(LocalDateTime.now())
                .build();

             Movement saved =
             movementRepository.save(movement);

            return toResponse(saved);
    }

    @Override
   public List<MovementResponse> findAll() {

    return movementRepository
            .findAll()
            .stream()
            .map(this::toResponse)
            .toList();
}

 private MovementResponse toResponse(
            Movement movement) {

        return MovementResponse.builder()
                .id(movement.getId())
                .productId(movement.getProduct().getId())
                .productName(movement.getProduct().getName())
                .quantity(movement.getQuantity())
                .type(movement.getType().name())
                .observation(movement.getObservation())
                .createdAt(movement.getCreatedAt())
                .build();
    }
}