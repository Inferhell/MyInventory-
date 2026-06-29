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
@RequestMapping("/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @PreAuthorize("hasAuthority('SUPPLIER_WRITE')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SupplierResponse createSupplier(
            @Valid @RequestBody CreateSupplierRequest request
    ) {

        return supplierService.createSupplier(request);
    }

    @PreAuthorize("hasAuthority('SUPPLIER_READ')")
    @GetMapping
    public List<SupplierResponse> getAllSuppliers() {

        return supplierService.getAllSuppliers();
    }

    @PreAuthorize("hasAuthority('SUPPLIER_READ')")
    @GetMapping("/{id}")
    public SupplierResponse getSupplierById(
            @PathVariable Long id
    ) {

        return supplierService.getSupplierById(id);
    }

    @PreAuthorize("hasAuthority('SUPPLIER_WRITE')")
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

    @PreAuthorize("hasAuthority('SUPPLIER_STATUS_CHANGE')")
    @PatchMapping("/{id}/disable")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void disableSupplier(
            @PathVariable Long id
    ) {

        supplierService.disableSupplier(id);
    }

    @PreAuthorize("hasAuthority('SUPPLIER_STATUS_CHANGE')")
    @PatchMapping("/{id}/enable")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void enableSupplier(
            @PathVariable Long id
    ) {

        supplierService.enableSupplier(id);
    }
}