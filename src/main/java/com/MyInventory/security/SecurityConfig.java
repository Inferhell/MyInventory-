package com.myinventory.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/admin")
                        .hasRole("ADMIN")

                        .requestMatchers("/supervisor")
                        .hasAnyRole(
                                "ADMIN",
                                "SUPERVISOR"
                        )

                        .requestMatchers("/employee")
                        .hasAnyRole(
                                "ADMIN",
                                "SUPERVISOR",
                                "EMPLOYEE"
                        )

                        .requestMatchers("/users/**")
                        .hasRole("ADMIN")

                        // ===== CATEGORÍAS =====

                        .requestMatchers(HttpMethod.POST, "/categories")
                        .hasAnyRole(
                                "ADMIN",
                                "SUPERVISOR"
                        )

                        .requestMatchers(HttpMethod.GET, "/categories/**")
                        .hasAnyRole(
                                "ADMIN",
                                "SUPERVISOR",
                                "EMPLOYEE"
                        )

                        .requestMatchers(HttpMethod.PUT, "/categories/**")
                        .hasAnyRole(
                                "ADMIN",
                                "SUPERVISOR"
                        )

                        .requestMatchers(HttpMethod.PATCH, "/categories/**")
                        .hasRole("ADMIN")

                        // ===== PRODUCTOS =====

                        .requestMatchers("/products/**")
                        .permitAll()



                        .requestMatchers("/change-password")
                        .authenticated()

                        .anyRequest()
                        .authenticated()
                )

                .formLogin(form -> form.permitAll())

                .logout(logout -> logout.permitAll());

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config)
            throws Exception {

        return config.getAuthenticationManager();
    }
}