package com.myinventory.security;

import com.myinventory.model.Role;

import org.springframework.stereotype.Service;

import java.util.EnumSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PermissionService {

    public Set<String> getPermissions(Role role) {

        if (role == null) {
            return Set.of();
        }

        return switch (role) {

            case ADMIN -> EnumSet.allOf(Permission.class)
                    .stream()
                    .map(Enum::name)
                    .collect(Collectors.toSet());

            case SUPERVISOR -> Set.of(
                    Permission.DASHBOARD_READ.name(),

                    Permission.PRODUCT_READ.name(),
                    Permission.PRODUCT_WRITE.name(),
                    Permission.PRODUCT_STATUS_CHANGE.name(),

                    Permission.CATEGORY_READ.name(),
                    Permission.CATEGORY_WRITE.name(),
                    Permission.CATEGORY_STATUS_CHANGE.name(),

                    Permission.SUPPLIER_READ.name(),
                    Permission.SUPPLIER_WRITE.name(),
                    Permission.SUPPLIER_STATUS_CHANGE.name(),

                    Permission.MOVEMENT_READ.name(),
                    Permission.MOVEMENT_CREATE.name()
            );

            case EMPLOYEE -> Set.of(
                    Permission.DASHBOARD_READ.name(),

                    Permission.PRODUCT_READ.name(),

                    Permission.MOVEMENT_READ.name(),
                    Permission.MOVEMENT_CREATE.name()
            );
        };
    }
}