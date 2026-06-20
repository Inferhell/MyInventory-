package com.myinventory.dto;

import lombok.Data;

@Data
public class CreateSupplierRequest {

    private String name;

    private String phone;

    private String email;

    private String address;

}