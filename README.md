# MyInventory

Sistema web Full Stack para la gestión de inventario desarrollado con Java, Spring Boot, MySQL y React.

MyInventory fue construido siguiendo una arquitectura empresarial, aplicando buenas prácticas de desarrollo, seguridad basada en roles y permisos, trazabilidad del inventario, pruebas automatizadas y una interfaz moderna.

---

## Tabla de contenidos

- Objetivo del proyecto
- Características principales
- Stack tecnológico
- Arquitectura
- Roles y permisos
- Reglas de negocio
- Dashboard
- Funcionalidades del Frontend
- Variables de entorno
- Cómo ejecutar el proyecto
- Testing
- CI/CD
- Estado del proyecto
- Roadmap
- Autor

---

# Objetivo del proyecto

MyInventory permite administrar:

- Productos
- Categorías
- Proveedores
- Usuarios
- Movimientos de inventario

El sistema está pensado para pequeñas y medianas empresas que necesitan controlar su inventario de forma segura, clara y completamente trazable.

---

# Características principales

- Autenticación con Spring Security
- Gestión de usuarios mediante roles y permisos
- Dashboard con indicadores y gráficos
- Gestión de productos
- Gestión de categorías
- Gestión de proveedores
- Gestión de usuarios
- Registro de entradas y salidas de inventario
- Control automático del stock
- Historial completo de movimientos
- Soft Delete para entidades principales
- Manejo profesional de errores mediante ProblemDetail
- Migraciones de base de datos con Flyway
- Testing automatizado
- Integración continua mediante GitHub Actions
- Modo claro y modo oscuro
- Filtros y ordenamiento en tablas

---

# Stack tecnológico

## Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL
- Flyway
- Maven
- Lombok
- Jakarta Validation
- JUnit 5
- Testcontainers

## Frontend

- React
- Vite
- Axios
- React Router
- Recharts
- JavaScript
- CSS

## Herramientas

- Git
- GitHub
- GitHub Actions
- Docker Desktop
- DBeaver
- Visual Studio Code
- Swagger / OpenAPI

---

# Arquitectura

## Backend

El backend sigue una arquitectura por capas.

```
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
Database
```

### Controller

Responsable de:

- Exponer endpoints REST.
- Recibir solicitudes HTTP.
- Validar datos.
- Aplicar autorización mediante `@PreAuthorize`.

### Service

Responsable de:

- Implementar las reglas de negocio.
- Gestionar transacciones.
- Lanzar excepciones de dominio.

### Repository

Responsable del acceso a datos mediante Spring Data JPA.

### DTO

Los DTO desacoplan las entidades JPA de la API pública.

---

## Frontend

El frontend sigue una estructura modular.

```
Pages
   │
   ▼
Components
   │
   ▼
Services
   │
   ▼
Axios
   │
   ▼
REST API
```

---

# Roles y permisos

## ADMIN

Puede administrar completamente el sistema.

Acceso a:

- Dashboard
- Productos
- Categorías
- Proveedores
- Movimientos
- Usuarios

Restricciones:

- No puede desactivarse a sí mismo.
- No puede desactivar el último administrador activo.
- No puede modificar el rol del último administrador activo.

---

## SUPERVISOR

Puede administrar:

- Dashboard
- Productos
- Categorías
- Proveedores
- Movimientos

No puede administrar usuarios.

---

## EMPLOYEE

Puede acceder a:

- Dashboard
- Consulta de productos
- Movimientos

No puede administrar:

- Usuarios
- Categorías
- Proveedores
- Productos

---

# Reglas de negocio

## Soft Delete

Las entidades principales nunca se eliminan físicamente.

Se utiliza:

```
active = true
active = false
```

Aplicado a:

- Users
- Products
- Categories
- Suppliers

---

## Entidades inactivas

Una entidad inactiva no puede editarse.

Flujo:

```
Activo
      │
      ▼
Editable

Inactivo
      │
      ▼
Debe reactivarse antes de editar
```

---

## Stock trazable

El stock nunca se modifica manualmente.

Siempre cambia mediante movimientos:

- INITIAL_BALANCE
- ENTRY
- EXIT

Cada movimiento registra:

- Stock anterior
- Stock posterior
- Usuario
- Fecha
- Producto

---

# Dashboard

Incluye:

- Total de productos
- Total de categorías
- Total de proveedores
- Total de movimientos
- Total de entradas
- Total de salidas
- Stock total
- Gráfico de entradas vs salidas
- Gráfico de movimientos por tipo
- Últimos movimientos
- Productos con stock crítico

---

# Funcionalidades del Frontend

- Inicio de sesión y cierre de sesión.
- Rutas protegidas.
- Sidebar dinámico según permisos.
- Formularios reutilizables.
- Tablas reutilizables.
- Alertas de éxito y error.
- Modales de confirmación.
- Badges de estado.
- Dashboard interactivo.
- Filtros y ordenamiento.
- Modo oscuro.

---

# Variables de entorno

## Backend

```env
DB_URL=jdbc:mysql://localhost:3306/myinventory
DB_USER=root
DB_PASSWORD=your_password

JPA_DDL_AUTO=validate
JPA_SHOW_SQL=true
JPA_FORMAT_SQL=true

FLYWAY_ENABLED=true
```

## Frontend

Crear el archivo:

```
myinventory-frontend/.env
```

Contenido:

```env
VITE_API_URL=http://localhost:8080
```

También se incluye:

```
myinventory-frontend/.env.example
```

---

# Cómo ejecutar el proyecto

## Backend

```bash
./mvnw spring-boot:run
```

En Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Servidor:

```
http://localhost:8080
```

## Frontend

```bash
cd myinventory-frontend

npm install

npm run dev
```

Servidor:

```
http://localhost:5173
```

---

# Testing

Los tests utilizan Testcontainers, por lo que Docker Desktop debe estar ejecutándose.

Ejecutar:

```powershell
.\mvnw.cmd clean verify
```

Incluye pruebas de:

- Dashboard
- Usuarios
- Productos
- Movimientos
- Permisos
- Contexto de Spring

---

# CI/CD

El proyecto utiliza GitHub Actions.

En cada Push se ejecutan automáticamente:

## Backend

- Compilación
- Maven Verify
- Tests automatizados

## Frontend

- ESLint
- Build de producción

---

# Estado del proyecto

Versión actual:

```
v1.0.0
```

Incluye:

- Backend completamente funcional.
- Frontend moderno.
- Dashboard con gráficos.
- Seguridad basada en roles y permisos.
- Testing automatizado.
- Integración continua.
- Modo oscuro.
- Filtros y ordenamiento.

---

# Roadmap

## v1.1

- Paginación.
- Exportación a Excel.
- Exportación a CSV.
- Filtros desde el backend.
- Optimización del rendimiento.
- Code Splitting.

## v1.2

- Docker Compose.
- SKU para productos.
- Stock mínimo configurable.
- Reportes avanzados.
- Mejoras de concurrencia.

---

# Autor

**Andrés Suárez**

Proyecto Full Stack desarrollado como portafolio profesional para demostrar conocimientos en:

- Arquitectura Backend con Spring Boot.
- Desarrollo Frontend con React.
- Seguridad de aplicaciones.
- Testing automatizado.
- Buenas prácticas de desarrollo.
- Diseño de interfaces modernas.
- Integración continua (CI/CD).
