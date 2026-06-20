package com.myinventory.service;

import com.myinventory.dto.CreateSupplierRequest;
import com.myinventory.dto.SupplierResponse;
import com.myinventory.dto.UpdateSupplierRequest;
import com.myinventory.model.Supplier;
import com.myinventory.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierServiceImpl(
            SupplierRepository supplierRepository) {

        this.supplierRepository = supplierRepository;
    }

    @Override
    public SupplierResponse save(
            CreateSupplierRequest request) {

        Supplier supplier = Supplier.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .address(request.getAddress())
                .active(true)
                .build();

        Supplier saved =
                supplierRepository.save(supplier);

        return SupplierResponse.builder()
                .id(saved.getId())
                .name(saved.getName())
                .phone(saved.getPhone())
                .email(saved.getEmail())
                .address(saved.getAddress())
                .active(saved.isActive())
                .build();
    }

    @Override
    public List<Supplier> findAll() {
        return supplierRepository.findByActiveTrue();
    }

    @Override
    public Supplier findById(Long id) {
        return supplierRepository.findById(id)
                .orElse(null);
    }

    @Override
    public Supplier update(
            Long id,
            UpdateSupplierRequest request) {

        Supplier supplier = findById(id);

        if (supplier == null) {
            return null;
        }

        supplier.setName(request.getName());
        supplier.setPhone(request.getPhone());
        supplier.setEmail(request.getEmail());
        supplier.setAddress(request.getAddress());

        return supplierRepository.save(supplier);
    }

    @Override
    public void disable(Long id) {

        Supplier supplier = findById(id);

        if (supplier != null) {

            supplier.setActive(false);

            supplierRepository.save(supplier);
        }
    }

   
}