package com.myinventory.service;

import com.myinventory.dto.CreateSupplierRequest;
import com.myinventory.dto.SupplierResponse;
import com.myinventory.dto.UpdateSupplierRequest;
import com.myinventory.model.Supplier;

import java.util.List;

public interface SupplierService {

    SupplierResponse save(CreateSupplierRequest request);

    List<Supplier> findAll();

    Supplier findById(Long id);

    Supplier update(Long id, UpdateSupplierRequest request);

    void disable(Long id);

}