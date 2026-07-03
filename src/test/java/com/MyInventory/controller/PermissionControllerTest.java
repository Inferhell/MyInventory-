package com.myinventory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myinventory.TestContainersConfig;
import com.myinventory.model.Category;
import com.myinventory.model.Product;
import com.myinventory.model.Role;
import com.myinventory.model.Supplier;
import com.myinventory.model.User;
import com.myinventory.repository.CategoryRepository;
import com.myinventory.repository.MovementRepository;
import com.myinventory.repository.ProductRepository;
import com.myinventory.repository.SupplierRepository;
import com.myinventory.repository.UserRepository;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;

import org.springframework.context.annotation.Import;

import org.springframework.http.MediaType;

import org.springframework.security.test.context.support.WithMockUser;

import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Import(TestContainersConfig.class)
@Transactional
class PermissionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private MovementRepository movementRepository;

    private Category category;

    private Supplier supplier;

    @BeforeEach
    void setUp() {

        movementRepository.deleteAll();
        productRepository.deleteAll();
        categoryRepository.deleteAll();
        supplierRepository.deleteAll();
        userRepository.deleteAll();

        User admin = User.builder()
                .name("Admin Test")
                .email("admin@test.com")
                .password("password")
                .role(Role.ADMIN)
                .active(true)
                .build();

        userRepository.save(admin);

        User supervisor = User.builder()
                .name("Supervisor Test")
                .email("supervisor@test.com")
                .password("password")
                .role(Role.SUPERVISOR)
                .active(true)
                .build();

        userRepository.save(supervisor);

        User employee = User.builder()
                .name("Employee Test")
                .email("employee@test.com")
                .password("password")
                .role(Role.EMPLOYEE)
                .active(true)
                .build();

        userRepository.save(employee);

        category = Category.builder()
                .name("Electrónica")
                .description("Categoría de prueba")
                .active(true)
                .build();

        categoryRepository.save(category);

        supplier = Supplier.builder()
                .name("Proveedor Test")
                .email("supplier@test.com")
                .phone("123456789")
                .address("Dirección test")
                .active(true)
                .build();

        supplierRepository.save(supplier);

        Product product = Product.builder()
                .name("Mouse")
                .description("Mouse inalámbrico")
                .price(BigDecimal.valueOf(25.50))
                .stock(10)
                .category(category)
                .supplier(supplier)
                .active(true)
                .build();

        productRepository.save(product);
    }

    @Test
    @WithMockUser(
            username = "employee@test.com",
            authorities = {
                    "PRODUCT_READ"
            }
    )
    void employeeWithProductRead_shouldViewProducts() throws Exception {

        mockMvc.perform(
                get("/products")
        )
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(
            username = "employee@test.com",
            authorities = {
                    "PRODUCT_READ"
            }
    )
    void employeeWithoutProductWrite_shouldNotCreateProduct() throws Exception {

        Map<String, Object> request =
                Map.of(
                        "name", "Teclado",
                        "description", "Teclado mecánico",
                        "price", 45.90,
                        "stock", 5,
                        "categoryId", category.getId(),
                        "supplierId", supplier.getId()
                );

        mockMvc.perform(
                post("/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                objectMapper.writeValueAsString(request)
                        )
        )
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(
            username = "supervisor@test.com",
            authorities = {
                    "PRODUCT_WRITE"
            }
    )
    void supervisorWithProductWrite_shouldCreateProduct() throws Exception {

        Map<String, Object> request =
                Map.of(
                        "name", "Teclado",
                        "description", "Teclado mecánico",
                        "price", 45.90,
                        "stock", 5,
                        "categoryId", category.getId(),
                        "supplierId", supplier.getId()
                );

        mockMvc.perform(
                post("/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                objectMapper.writeValueAsString(request)
                        )
        )
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    @WithMockUser(
            username = "employee@test.com",
            authorities = {
                    "PRODUCT_READ"
            }
    )
    void employeeWithoutUserRead_shouldNotViewUsers() throws Exception {

        mockMvc.perform(
                get("/users")
        )
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(
            username = "admin@test.com",
            authorities = {
                    "USER_READ"
            }
    )
    void adminWithUserRead_shouldViewUsers() throws Exception {

        mockMvc.perform(
                get("/users")
        )
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(
            username = "employee@test.com",
            authorities = {
                    "MOVEMENT_READ",
                    "MOVEMENT_CREATE"
            }
    )
    void employeeWithMovementPermissions_shouldViewMovements() throws Exception {

        mockMvc.perform(
                get("/movements")
        )
                .andExpect(status().isOk());
    }
}