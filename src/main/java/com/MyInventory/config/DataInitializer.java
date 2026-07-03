package com.myinventory.config;

import com.myinventory.model.Role;
import com.myinventory.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.myinventory.dto.CreateUserRequest;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserService userService;

    @Override
public void run(String... args) {

    if (userService.findByEmail("admin@myinventory.com").isEmpty()) {

        CreateUserRequest admin = new CreateUserRequest(
        "Administrator",
        "admin@myinventory.com",
        "Admin123*",
        Role.ADMIN
);

userService.createUser(admin);
    }

    if (userService.findByEmail("supervisor@myinventory.com").isEmpty()) {

        CreateUserRequest supervisor = new CreateUserRequest(
        "Supervisor",
        "supervisor@myinventory.com",
        "Supervisor123*",
        Role.SUPERVISOR
);

userService.createUser(supervisor);
    }

    if (userService.findByEmail("employee@myinventory.com").isEmpty()) {

       CreateUserRequest employee = new CreateUserRequest(
        "Employee",
        "employee@myinventory.com",
        "Employee123*",
        Role.EMPLOYEE
);

userService.createUser(employee);
    }

    System.out.println("Usuarios iniciales verificados.");
}
}