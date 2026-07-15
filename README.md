# MyInventory

MyInventory es un sistema web Full Stack de gestión de inventario construido con Java, Spring Boot, MySQL y React.

El proyecto está orientado a demostrar una arquitectura empresarial limpia, seguridad por roles y permisos, trazabilidad del inventario, manejo profesional de errores, testing automatizado y una interfaz moderna.

---

## Objetivo del proyecto

MyInventory permite administrar productos, categorías, proveedores, usuarios y movimientos de inventario.

El sistema está pensado para pequeñas y medianas empresas que necesitan controlar su inventario de forma clara, segura y trazable.

---

## Características principales

- Autenticación con Spring Security.
- Roles y permisos por usuario.
- Dashboard con KPIs, gráficos y datos críticos.
- Gestión de productos.
- Gestión de categorías.
- Gestión de proveedores.
- Gestión de usuarios.
- Registro de entradas y salidas de inventario.
- Stock trazable mediante movimientos.
- Soft delete para entidades principales.
- Manejo profesional de errores con ProblemDetail.
- Migraciones de base de datos con Flyway.
- Tests automatizados con JUnit 5 y Testcontainers.
- CI con GitHub Actions.
- Frontend moderno con React y Vite.
- Modo claro y modo oscuro.
- Filtros y ordenamiento en tablas.

---

## Stack tecnológico

### Backend

- Java 21
- Spring Boot 4.1
- Spring Web
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL 8
- Flyway
- Maven
- Lombok
- Jakarta Validation
- JUnit 5
- Testcontainers

### Frontend

- React 19
- Vite
- Axios
- React Router
- Recharts
- JavaScript
- CSS personalizado

### Herramientas

- Git
- GitHub
- GitHub Actions
- Docker Desktop
- DBeaver
- VS Code
- Swagger / OpenAPI

---

## Arquitectura backend

El backend sigue una arquitectura por capas:

Controller -> Service -> Repository -> Database

---
### Responsabilidades

## Controller:

- Expone endpoints REST.
- Recibe requests HTTP.
- Aplica validaciones.
- Aplica autorización con @PreAuthorize.

## Service

Contiene reglas de negocio.
Maneja transacciones.
Lanza excepciones de dominio.

## Repository

Acceso a datos mediante Spring Data JPA.

## DTOs

Separan las entidades JPA de la API pública.

