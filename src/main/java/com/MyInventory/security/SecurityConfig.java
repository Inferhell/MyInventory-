package com.myinventory.security;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.MediaType;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .cors(cors -> {
                })

                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()

                        .requestMatchers(
                                "/login",
                                "/logout"
                        ).permitAll()

                        .anyRequest()
                        .authenticated()
                )

                .exceptionHandling(exception -> exception

                        .authenticationEntryPoint(
                                (request, response, authException) ->
                                        writeJsonError(
                                                response,
                                                HttpServletResponse.SC_UNAUTHORIZED,
                                                "Authentication error",
                                                "Debes iniciar sesión"
                                        )
                        )

                        .accessDeniedHandler(
                                (request, response, accessDeniedException) ->
                                        writeJsonError(
                                                response,
                                                HttpServletResponse.SC_FORBIDDEN,
                                                "Access denied",
                                                "No tienes permisos para acceder a este recurso"
                                        )
                        )
                )

                .formLogin(form -> form

                        .loginProcessingUrl("/login")

                        .successHandler(
                                (request, response, authentication) -> {

                                    response.setStatus(
                                            HttpServletResponse.SC_OK
                                    );

                                    response.setContentType(
                                            MediaType.APPLICATION_JSON_VALUE
                                    );

                                    response.setCharacterEncoding(
                                            StandardCharsets.UTF_8.name()
                                    );

                                    response.getWriter().write("""
                                            {
                                                "message": "Login exitoso"
                                            }
                                            """);
                                }
                        )

                        .failureHandler(
                                (request, response, exception) -> {

                                    SecurityContextHolder.clearContext();

                                    HttpSession session =
                                            request.getSession(false);

                                    if (session != null) {
                                        session.invalidate();
                                    }

                                    writeJsonError(
                                            response,
                                            HttpServletResponse.SC_UNAUTHORIZED,
                                            "Authentication error",
                                            "Correo o contraseña incorrectos"
                                    );
                                }
                        )

                        .permitAll()
                )

                .logout(logout -> logout

                        .logoutUrl("/logout")

                        .logoutSuccessHandler(
                                (request, response, authentication) -> {

                                    SecurityContextHolder.clearContext();

                                    HttpSession session =
                                            request.getSession(false);

                                    if (session != null) {
                                        session.invalidate();
                                    }

                                    response.setStatus(
                                            HttpServletResponse.SC_NO_CONTENT
                                    );
                                }
                        )

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

    private static void writeJsonError(
            HttpServletResponse response,
            int status,
            String title,
            String detail
    ) throws IOException {

        response.setStatus(status);

        response.setContentType(
                MediaType.APPLICATION_JSON_VALUE
        );

        response.setCharacterEncoding(
                StandardCharsets.UTF_8.name()
        );

        response.getWriter().write(
                """
                {
                    "title": "%s",
                    "detail": "%s"
                }
                """.formatted(
                        title,
                        detail
                )
        );
    }
}