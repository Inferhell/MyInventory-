package com.myinventory.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI myInventoryOpenAPI() {

        return new OpenAPI()
                .info(
                        new Info()
                                .title("MyInventory API")
                                .version("1.0")
                                .description(
                                        "Sistema de gestión de inventario desarrollado con Spring Boot, Spring Security y MySQL"
                                )
                );
    }
}