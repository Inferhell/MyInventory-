package com.myinventory.service;

import com.myinventory.dto.CreateSupplierRequest;
import com.myinventory.dto.SupplierResponse;
import com.myinventory.dto.UpdateSupplierRequest;
import com.myinventory.exception.DuplicateResourceException;
import com.myinventory.exception.ResourceNotFoundException;
import com.myinventory.model.Supplier;
import com.myinventory.repository.SupplierRepository;
import com.myinventory.exception.BusinessRuleException;
import com.myinventory.repository.ProductRepository;


import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    private final ProductRepository productRepository;

    @Override
    public List<SupplierResponse> getAllSuppliers() {

        return supplierRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public SupplierResponse getSupplierById(Long id) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Proveedor no encontrado"
                        )
                );

        return toResponse(supplier);
    }

    @Override
    public SupplierResponse createSupplier(
            CreateSupplierRequest request
    ) {

        String name = normalize(request.name());
        String phone = normalize(request.phone());
        String email = normalize(request.email());
        String address = normalize(request.address());

        if (supplierRepository.existsByName(name)) {

            throw new DuplicateResourceException(
        "El proveedor ya existe"
);
        }

        if (supplierRepository.existsByEmail(email)) {

            throw new DuplicateResourceException(
        "El correo del proveedor ya está registrado"
);
        }

        Supplier supplier = Supplier.builder()
                .name(name)
                .phone(phone)
                .email(email)
                .address(address)
                .active(true)
                .build();

        Supplier savedSupplier =
                supplierRepository.save(supplier);

        return toResponse(savedSupplier);
    }

    @Override
    public SupplierResponse updateSupplier(
            Long id,
            UpdateSupplierRequest request
    ) {

        Supplier supplier = supplierRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Proveedor no encontrado o inactivo"
                        )
                );

        String name = normalize(request.name());
        String phone = normalize(request.phone());
        String email = normalize(request.email());
        String address = normalize(request.address());

       if (supplierRepository.existsByNameAndIdNot(
        name,
        id
)) {

    throw new DuplicateResourceException(
            "El proveedor ya existe"
    );
}

if (supplierRepository.existsByEmailAndIdNot(
        email,
        id
)) {

    throw new DuplicateResourceException(
            "El correo del proveedor ya está registrado"
    );
}

        supplier.setName(name);
        supplier.setPhone(phone);
        supplier.setEmail(email);
        supplier.setAddress(address);

        Supplier updatedSupplier =
                supplierRepository.save(supplier);

        return toResponse(updatedSupplier);
    }

   @Override
public void disableSupplier(Long id) {

    Supplier supplier = supplierRepository.findByIdAndActiveTrue(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Proveedor no encontrado o inactivo"
                    )
            );

    long activeProducts =
            productRepository.countBySupplierIdAndActiveTrue(id);

    if (activeProducts > 0) {

        throw new BusinessRuleException(
                "No se puede desactivar el proveedor porque tiene "
                        + activeProducts
                        + " productos activos asociados"
        );
    }

    supplier.setActive(false);

    supplierRepository.save(supplier);
}
    @Override
    public void enableSupplier(Long id) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Proveedor no encontrado"
                        )
                );

        supplier.setActive(true);

        supplierRepository.save(supplier);
    }

    private SupplierResponse toResponse(Supplier supplier) {

    return new SupplierResponse(
            supplier.getId(),
            supplier.getName(),
            supplier.getPhone(),
            supplier.getEmail(),
            supplier.getAddress(),
            supplier.isActive(),
            supplier.getCreatedAt(),
            supplier.getUpdatedAt()
    );
}

    private String normalize(String value) {

        if (value == null) {
            return "";
        }

        return value.trim();
    }
}