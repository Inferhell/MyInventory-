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

            System.out.println("Administrador inicial creado.");
        }
    }
}