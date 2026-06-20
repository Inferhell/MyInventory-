package com.myinventory.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SupplierResponse {

    private Long id;

    private String name;

    private String phone;

    private String email;

    private String address;

    private boolean active;

}