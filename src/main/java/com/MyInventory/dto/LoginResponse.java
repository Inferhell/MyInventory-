package com.myinventory.dto;

public record LoginResponse(
        Long id,
        String name,
        String email,
        String role
) {}