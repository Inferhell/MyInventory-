package com.myinventory.controller;

import com.myinventory.dto.CreateSupplierRequest;
import com.myinventory.dto.SupplierResponse;
import com.myinventory.dto.UpdateSupplierRequest;
import com.myinventory.service.SupplierService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR')")
@RequestMapping("/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SupplierResponse createSupplier(
            @Valid @RequestBody CreateSupplierRequest request
    ) {

        return supplierService.createSupplier(request);
    }

    @GetMapping
    public List<SupplierResponse> getAllSuppliers() {

        return supplierService.getAllSuppliers();
    }

    @GetMapping("/{id}")
    public SupplierResponse getSupplierById(
            @PathVariable Long id
    ) {

        return supplierService.getSupplierById(id);
    }

    @PutMapping("/{id}")
    public SupplierResponse updateSupplier(
            @PathVariable Long id,
            @Valid @RequestBody UpdateSupplierRequest request
    ) {

        return supplierService.updateSupplier(
                id,
                request
        );
    }

    @PatchMapping("/{id}/disable")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void disableSupplier(
            @PathVariable Long id
    ) {

        supplierService.disableSupplier(id);
    }

    @PatchMapping("/{id}/enable")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void enableSupplier(
            @PathVariable Long id
    ) {

        supplierService.enableSupplier(id);
    }
}