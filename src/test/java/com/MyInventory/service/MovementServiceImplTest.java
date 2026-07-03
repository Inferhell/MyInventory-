package com.myinventory.service;

import com.myinventory.TestContainersConfig;
import com.myinventory.dto.CreateMovementRequest;
import com.myinventory.dto.MovementResponse;
import com.myinventory.exception.InsufficientStockException;
import com.myinventory.model.Category;
import com.myinventory.model.Movement;
import com.myinventory.model.Product;
import com.myinventory.model.Role;
import com.myinventory.model.Supplier;
import com.myinventory.model.User;
import com.myinventory.repository.CategoryRepository;
import com.myinventory.repository.MovementRepository;
import com.myinventory.repository.ProductRepository;
import com.myinventory.repository.SupplierRepository;
import com.myinventory.repository.UserRepository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@ActiveProfiles("test")
@Import(TestContainersConfig.class)
@Transactional
class MovementServiceImplTest {

    @Autowired
    private MovementService movementService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovementRepository movementRepository;

    private Product product;

    private User user;

    @BeforeEach
    void setUp() {

        movementRepository.deleteAll();
        productRepository.deleteAll();
        categoryRepository.deleteAll();
        supplierRepository.deleteAll();
        userRepository.deleteAll();

        user = User.builder()
                .name("Admin Test")
                .email("admin@test.com")
                .password("password")
                .role(Role.ADMIN)
                .active(true)
                .build();

        userRepository.save(user);

        Category category = Category.builder()
                .name("Electrónica")
                .description("Categoría de prueba")
                .active(true)
                .build();

        categoryRepository.save(category);

        Supplier supplier = Supplier.builder()
                .name("Proveedor Test")
                .email("supplier@test.com")
                .phone("123456789")
                .address("Dirección test")
                .active(true)
                .build();

        supplierRepository.save(supplier);

        product = Product.builder()
                .name("Mouse")
                .description("Mouse inalámbrico")
                .price(BigDecimal.valueOf(25.50))
                .stock(10)
                .category(category)
                .supplier(supplier)
                .active(true)
                .build();

        productRepository.save(product);

        SecurityContextHolder.getContext()
                .setAuthentication(
                        new TestingAuthenticationToken(
                                user.getEmail(),
                                null
                        )
                );
    }

    @AfterEach
    void tearDown() {

        SecurityContextHolder.clearContext();
    }

    @Test
    void registerEntry_shouldIncreaseStockAndSaveStockSnapshots() {

        CreateMovementRequest request =
                new CreateMovementRequest();

        request.setProductId(product.getId());
        request.setQuantity(5);
        request.setObservation("Entrada de prueba");

        MovementResponse response =
                movementService.registerEntry(request);

        Product updatedProduct =
                productRepository.findById(product.getId())
                        .orElseThrow();

        assertThat(updatedProduct.getStock())
                .isEqualTo(15);

        assertThat(response.getStockBefore())
                .isEqualTo(10);

        assertThat(response.getStockAfter())
                .isEqualTo(15);

        assertThat(response.getQuantity())
                .isEqualTo(5);

        assertThat(response.getType())
                .isEqualTo("ENTRY");
    }

    @Test
    void registerExit_shouldDecreaseStockAndSaveStockSnapshots() {

        CreateMovementRequest request =
                new CreateMovementRequest();

        request.setProductId(product.getId());
        request.setQuantity(3);
        request.setObservation("Salida de prueba");

        MovementResponse response =
                movementService.registerExit(request);

        Product updatedProduct =
                productRepository.findById(product.getId())
                        .orElseThrow();

        assertThat(updatedProduct.getStock())
                .isEqualTo(7);

        assertThat(response.getStockBefore())
                .isEqualTo(10);

        assertThat(response.getStockAfter())
                .isEqualTo(7);

        assertThat(response.getQuantity())
                .isEqualTo(3);

        assertThat(response.getType())
                .isEqualTo("EXIT");
    }

    @Test
    void registerExit_shouldThrowExceptionWhenStockIsInsufficient() {

        CreateMovementRequest request =
                new CreateMovementRequest();

        request.setProductId(product.getId());
        request.setQuantity(20);
        request.setObservation("Salida inválida");

        assertThatThrownBy(() ->
                movementService.registerExit(request)
        )
                .isInstanceOf(InsufficientStockException.class)
                .hasMessageContaining("Stock insuficiente");

        Product unchangedProduct =
                productRepository.findById(product.getId())
                        .orElseThrow();

        assertThat(unchangedProduct.getStock())
                .isEqualTo(10);
    }

    @Test
    void registerEntry_shouldPersistMovement() {

        CreateMovementRequest request =
                new CreateMovementRequest();

        request.setProductId(product.getId());
        request.setQuantity(4);
        request.setObservation("Entrada persistida");

        movementService.registerEntry(request);

        assertThat(movementRepository.findAll())
                .hasSize(1);

        Movement movement =
                movementRepository.findAll().get(0);

        assertThat(movement.getStockBefore())
                .isEqualTo(10);

        assertThat(movement.getStockAfter())
                .isEqualTo(14);

        assertThat(movement.getProduct().getId())
                .isEqualTo(product.getId());

        assertThat(movement.getUser().getEmail())
                .isEqualTo(user.getEmail());
    }
}