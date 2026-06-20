package com.myinventory.controller;

import com.myinventory.dto.CreateSupplierRequest;
import com.myinventory.dto.SupplierResponse;
import com.myinventory.dto.UpdateSupplierRequest;
import com.myinventory.model.Supplier;
import com.myinventory.service.SupplierService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    public SupplierController(
            SupplierService supplierService) {

        this.supplierService = supplierService;
    }

    @PostMapping
    public SupplierResponse save(
            @RequestBody CreateSupplierRequest request) {

        return supplierService.save(request);
    }

    @GetMapping
    public List<Supplier> findAll() {

        return supplierService.findAll();
    }

    @GetMapping("/{id}")
    public Supplier findById(
            @PathVariable Long id) {

        return supplierService.findById(id);
    }

    @PutMapping("/{id}")
    public Supplier update(
            @PathVariable Long id,
            @RequestBody UpdateSupplierRequest request) {

        return supplierService.update(id, request);
    }

    @PatchMapping("/{id}/disable")
    public void disable(
            @PathVariable Long id) {

        supplierService.disable(id);
    }
}