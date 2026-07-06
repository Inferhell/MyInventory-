import ActionButton from "./ActionButton";
import StockBadge from "./StockBadge";

function ProductForm({
    canWriteProduct,
    editingId,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    stock,
    setStock,
    categoryId,
    setCategoryId,
    supplierId,
    setSupplierId,
    activeCategories,
    activeSuppliers,
    loading,
    handleSaveProduct,
    clearForm
}) {

    if (!canWriteProduct) {
        return null;
    }

    return (
        <>
            <h2>
                {
                    editingId
                        ? "Editar Producto"
                        : "Nuevo Producto"
                }
            </h2>

            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(event) =>
                    setName(event.target.value)
                }
                disabled={loading}
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(event) =>
                    setDescription(event.target.value)
                }
                disabled={loading}
            />

            <br />
            <br />

            <input
                type="number"
                placeholder="Precio"
                value={price}
                min="0"
                onChange={(event) =>
                    setPrice(event.target.value)
                }
                disabled={loading}
            />

            <br />
            <br />

            {
                editingId ? (

                    <p>
                        <strong>
                            Stock actual:
                        </strong>

                        {" "}

                        <StockBadge stock={stock} />

                        <br />

                        <small>
                            El stock se modifica desde Movimientos.
                        </small>
                    </p>

                ) : (

                    <input
                        type="number"
                        placeholder="Stock inicial"
                        value={stock}
                        min="0"
                        onChange={(event) =>
                            setStock(event.target.value)
                        }
                        disabled={loading}
                    />
                )
            }

            <br />
            <br />

            <select
                value={categoryId}
                onChange={(event) =>
                    setCategoryId(event.target.value)
                }
                disabled={loading}
            >
                <option value="">
                    Seleccione categoría
                </option>

                {
                    activeCategories.map(category => (

                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))
                }
            </select>

            <br />
            <br />

            <select
                value={supplierId}
                onChange={(event) =>
                    setSupplierId(event.target.value)
                }
                disabled={loading}
            >
                <option value="">
                    Seleccione proveedor
                </option>

                {
                    activeSuppliers.map(supplier => (

                        <option
                            key={supplier.id}
                            value={supplier.id}
                        >
                            {supplier.name}
                        </option>
                    ))
                }
            </select>

            <br />
            <br />

            <ActionButton
                variant="primary"
                onClick={handleSaveProduct}
                disabled={loading}
            >
                {
                    editingId
                        ? "Actualizar Producto"
                        : "Crear Producto"
                }
            </ActionButton>

            {
                editingId && (

                    <ActionButton
                        variant="secondary"
                        onClick={clearForm}
                        disabled={loading}
                    >
                        Cancelar
                    </ActionButton>
                )
            }

            <hr />
        </>
    );
}

export default ProductForm;