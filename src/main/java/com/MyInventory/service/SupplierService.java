package com.myinventory.service;

import com.myinventory.dto.CreateSupplierRequest;
import com.myinventory.dto.SupplierResponse;
import com.myinventory.dto.UpdateSupplierRequest;

import java.util.List;

public interface SupplierService {

    List<SupplierResponse> getAllSuppliers();

    SupplierResponse getSupplierById(Long id);

    SupplierResponse createSupplier(
            CreateSupplierRequest request
    );

    SupplierResponse updateSupplier(
            Long id,
            UpdateSupplierRequest request
    );

    void disableSupplier(Long id);

    void enableSupplier(Long id);
}