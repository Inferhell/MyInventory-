package com.myinventory.service;

import com.myinventory.TestContainersConfig;
import com.myinventory.dto.DashboardResponse;
import com.myinventory.model.Category;
import com.myinventory.model.Movement;
import com.myinventory.model.MovementType;
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
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Import(TestContainersConfig.class)
@Transactional
class DashboardServiceImplTest {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private MovementRepository movementRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private UserRepository userRepository;

    private User adminUser;

    private Category category;

    private Supplier supplier;

    private Product normalStockProduct;

    private Product lowStockProduct;

    private Product outOfStockProduct;

    @BeforeEach
    void setUp() {

        movementRepository.deleteAll();
        productRepository.deleteAll();
        categoryRepository.deleteAll();
        supplierRepository.deleteAll();
        userRepository.deleteAll();

        adminUser = User.builder()
                .name("Admin Test")
                .email("admin@test.com")
                .password("encoded-password")
                .role(Role.ADMIN)
                .active(true)
                .build();

        userRepository.save(adminUser);

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

        normalStockProduct = createProduct(
                "Mouse",
                10,
                true
        );

        lowStockProduct = createProduct(
                "Cable USB",
                3,
                true
        );

        outOfStockProduct = createProduct(
                "Teclado",
                0,
                true
        );

        createProduct(
                "Producto inactivo bajo stock",
                1,
                false
        );

        createMovement(
                normalStockProduct,
                MovementType.INITIAL_BALANCE,
                10,
                0,
                10
        );

        createMovement(
                lowStockProduct,
                MovementType.INITIAL_BALANCE,
                3,
                0,
                3
        );

        createMovement(
                outOfStockProduct,
                MovementType.INITIAL_BALANCE,
                1,
                0,
                1
        );

        createMovement(
                normalStockProduct,
                MovementType.ENTRY,
                5,
                10,
                15
        );

        createMovement(
                normalStockProduct,
                MovementType.EXIT,
                2,
                15,
                13
        );

        createMovement(
                lowStockProduct,
                MovementType.EXIT,
                1,
                3,
                2
        );
    }

    @Test
    void getDashboardData_shouldReturnMainTotals() {

        DashboardResponse response =
                dashboardService.getDashboard();
                assertThat(response.getTotalProducts())
                        .isEqualTo(3);

                assertThat(response.getTotalCategories())
                        .isEqualTo(1);

                assertThat(response.getTotalSuppliers())
                        .isEqualTo(1);

                assertThat(response.getTotalMovements())
                        .isEqualTo(6);

                assertThat(response.getTotalEntries())
                        .isEqualTo(1);

                assertThat(response.getTotalExits())
                        .isEqualTo(2);

                assertThat(response.getTotalStock())
                        .isEqualTo(13);
    }

    @Test
    void getDashboardData_shouldReturnRecentMovementsLimitedToFive() {

        DashboardResponse response =
                dashboardService.getDashboard();

                assertThat(response.getRecentMovements())
                        .hasSize(5);

                assertThat(response.getRecentMovements())
                        .allSatisfy(movement -> {
                        assertThat(movement.id())
                                .isNotNull();

                        assertThat(movement.productName())
                                .isNotBlank();

                        assertThat(movement.type())
                                .isNotNull();

                        assertThat(movement.quantity())
                                .isPositive();

                        assertThat(movement.createdAt())
                                .isNotNull();
                });
    }

    @Test
    void getDashboardData_shouldReturnOnlyActiveLowStockProducts() {

        DashboardResponse response =
                dashboardService.getDashboard();

                assertThat(response.getLowStockProducts())
                        .hasSize(2);

                assertThat(response.getLowStockProducts())
                        .extracting("name")
                        .containsExactly(
                                "Teclado",
                                "Cable USB"
                        );

                assertThat(response.getLowStockProducts())
                        .extracting("name")
                        .doesNotContain(
                                "Mouse",
                                "Producto inactivo bajo stock"
                        );

                assertThat(response.getLowStockProducts())
                        .allSatisfy(product ->
                                assertThat(product.stock())
                                        .isLessThanOrEqualTo(5)
                );
    }

    private Product createProduct(
            String name,
            Integer stock,
            boolean active
    ) {

        Product product = Product.builder()
                .name(name)
                .description("Producto de prueba")
                .price(BigDecimal.valueOf(25.50))
                .stock(stock)
                .category(category)
                .supplier(supplier)
                .active(active)
                .build();

        return productRepository.save(product);
    }

    private Movement createMovement(
            Product product,
            MovementType type,
            Integer quantity,
            Integer stockBefore,
            Integer stockAfter
    ) {

        Movement movement = Movement.builder()
                .product(product)
                .type(type)
                .quantity(quantity)
                .stockBefore(stockBefore)
                .stockAfter(stockAfter)
                .observation("Movimiento de prueba")
                .user(adminUser)
                .build();

        return movementRepository.save(movement);
    }
}