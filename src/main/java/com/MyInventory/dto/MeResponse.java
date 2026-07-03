package com.myinventory.dto;

import java.util.Set;

public record MeResponse(

        Long id,

        String name,

        String email,

        String role,

        boolean active,

        Set<String> permissions

) {
}