package com.myinventory.security;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

            .cors(cors -> {})

            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                // Swagger
                .requestMatchers(
                        "/swagger-ui/**",
                        "/v3/api-docs/**"
                ).permitAll()

                // Login y logout
                .requestMatchers(
                        "/login",
                        "/logout"
                ).permitAll()

                // Usuario autenticado
                .requestMatchers(
                        "/me",
                        "/dashboard",
                        "/products/**",
                        "/movements/**",
                        "/change-password"
                ).authenticated()

                // Admin + Supervisor
                .requestMatchers(
                        "/categories/**",
                        "/suppliers/**"
                ).hasAnyRole(
                        "ADMIN",
                        "SUPERVISOR"
                )

                // Solo Admin
                .requestMatchers(
                        "/users/**"
                ).hasRole("ADMIN")

                .anyRequest()
                .authenticated()
            )

            .formLogin(form -> form
                    .permitAll()
            )

            .logout(logout -> logout
                    .permitAll()
            );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {

        return config.getAuthenticationManager();
    }
}