package com.myinventory.service;

import com.myinventory.TestContainersConfig;
import com.myinventory.dto.CreateUserRequest;
import com.myinventory.dto.UpdateUserRequest;
import com.myinventory.exception.BusinessRuleException;
import com.myinventory.exception.DuplicateResourceException;
import com.myinventory.exception.ResourceNotFoundException;
import com.myinventory.model.Role;
import com.myinventory.model.User;
import com.myinventory.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@ActiveProfiles("test")
@Import(TestContainersConfig.class)
@Transactional
class UserServiceImplTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    private User adminUser;

    @BeforeEach
    void setUp() {

        userRepository.deleteAll();

        adminUser = User.builder()
                .name("Admin Principal")
                .email("admin@test.com")
                .password("encoded-password")
                .role(Role.ADMIN)
                .active(true)
                .build();

        userRepository.save(adminUser);
    }

    @Test
    void createUser_shouldThrowExceptionWhenEmailAlreadyExists() {

        CreateUserRequest request =
                new CreateUserRequest(
                        "Nuevo Usuario",
                        "ADMIN@TEST.COM",
                        "password123",
                        Role.EMPLOYEE
                );

        assertThatThrownBy(() ->
                userService.createUser(request)
        )
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessageContaining("El correo ya está registrado");
    }

    @Test
    void disableUser_shouldThrowExceptionWhenUserDisablesItself() {

        assertThatThrownBy(() ->
                userService.disableUser(
                        adminUser.getId(),
                        adminUser.getEmail()
                )
        )
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("No puedes desactivar tu propio usuario");
    }

    @Test
    void disableUser_shouldThrowExceptionWhenDisablingLastActiveAdmin() {

        User employee = User.builder()
                .name("Empleado Test")
                .email("employee@test.com")
                .password("encoded-password")
                .role(Role.EMPLOYEE)
                .active(true)
                .build();

        userRepository.save(employee);

        assertThatThrownBy(() ->
                userService.disableUser(
                        adminUser.getId(),
                        employee.getEmail()
                )
        )
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("No se puede desactivar el último ADMIN activo");
    }

    @Test
    void updateUser_shouldThrowExceptionWhenChangingRoleOfLastActiveAdmin() {

        UpdateUserRequest request =
                new UpdateUserRequest(
                        "Admin Principal",
                        "admin@test.com",
                        Role.SUPERVISOR
                );

        assertThatThrownBy(() ->
                userService.updateUser(
                        adminUser.getId(),
                        request
                )
        )
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("No se puede cambiar el rol del último ADMIN activo");
    }

    @Test
    void updateUser_shouldThrowExceptionWhenUserIsInactive() {

        adminUser.setActive(false);

        userRepository.save(adminUser);

        UpdateUserRequest request =
                new UpdateUserRequest(
                        "Admin Editado",
                        "admin@test.com",
                        Role.ADMIN
                );

        assertThatThrownBy(() ->
                userService.updateUser(
                        adminUser.getId(),
                        request
                )
        )
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Usuario no encontrado o inactivo");
    }

    @Test
    void disableUser_shouldAllowDisablingAdminWhenAnotherAdminExists() {

        User secondAdmin = User.builder()
                .name("Segundo Admin")
                .email("admin2@test.com")
                .password("encoded-password")
                .role(Role.ADMIN)
                .active(true)
                .build();

        userRepository.save(secondAdmin);

        User employee = User.builder()
                .name("Empleado Test")
                .email("employee@test.com")
                .password("encoded-password")
                .role(Role.EMPLOYEE)
                .active(true)
                .build();

        userRepository.save(employee);

        userService.disableUser(
                adminUser.getId(),
                employee.getEmail()
        );

        User disabledAdmin =
                userRepository.findById(adminUser.getId())
                        .orElseThrow();

        assertThat(disabledAdmin.isActive())
                .isFalse();
    }
}