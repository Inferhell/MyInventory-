package com.myinventory;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;

import org.testcontainers.containers.MySQLContainer;

@TestConfiguration(proxyBeanMethods = false)
public class TestContainersConfig {

    @Bean
    @ServiceConnection
    MySQLContainer<?> mysqlContainer() {

        return new MySQLContainer<>("mysql:8.4")
                .withDatabaseName("myinventory_test")
                .withUsername("test")
                .withPassword("test");
    }
}