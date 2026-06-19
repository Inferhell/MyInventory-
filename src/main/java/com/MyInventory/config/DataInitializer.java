package com.myinventory.config;

import com.myinventory.model.Role;
import com.myinventory.model.User;
import com.myinventory.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserService userService;

    @Override
public void run(String... args) {

    if (userService.findByEmail("admin@myinventory.com").isEmpty()) {

        User admin = User.builder()
                .name("Administrator")
                .email("admin@myinventory.com")
                .password("Admin123*")
                .role(Role.ADMIN)
                .active(true)
                .build();

        userService.createUser(admin);
    }

    if (userService.findByEmail("supervisor@myinventory.com").isEmpty()) {

        User supervisor = User.builder()
                .name("Supervisor")
                .email("supervisor@myinventory.com")
                .password("Supervisor123*")
                .role(Role.SUPERVISOR)
                .active(true)
                .build();

        userService.createUser(supervisor);
    }

    if (userService.findByEmail("employee@myinventory.com").isEmpty()) {

        User employee = User.builder()
                .name("Employee")
                .email("employee@myinventory.com")
                .password("Employee123*")
                .role(Role.EMPLOYEE)
                .active(true)
                .build();

        userService.createUser(employee);
    }

    System.out.println("Usuarios iniciales verificados.");
}
}