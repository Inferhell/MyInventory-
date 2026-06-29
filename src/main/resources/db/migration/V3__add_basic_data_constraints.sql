-- Restricciones básicas de integridad de datos para MyInventory.
-- Estas reglas refuerzan condiciones críticas que ya valida el backend.

ALTER TABLE products
    ADD CONSTRAINT chk_products_stock_non_negative
    CHECK (stock >= 0);

ALTER TABLE products
    ADD CONSTRAINT chk_products_price_positive
    CHECK (price > 0);

ALTER TABLE movements
    ADD CONSTRAINT chk_movements_quantity_positive
    CHECK (quantity > 0);

ALTER TABLE movements
    ADD CONSTRAINT chk_movements_stock_before_non_negative
    CHECK (stock_before >= 0);

ALTER TABLE movements
    ADD CONSTRAINT chk_movements_stock_after_non_negative
    CHECK (stock_after >= 0);