import ActionButton from "./ActionButton";
import FormActions from "./FormActions";
import FormGroup from "./FormGroup";
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

            <FormGroup label="Nombre">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    disabled={loading}
                />
            </FormGroup>

            <FormGroup label="Descripción">
                <input
                    type="text"
                    placeholder="Descripción"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                    disabled={loading}
                />
            </FormGroup>

            <FormGroup label="Precio">
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
            </FormGroup>

            {
                editingId ? (

                    <FormGroup label="Stock actual">
                        <div>
                            <StockBadge stock={stock} />
                        </div>

                        <small>
                            El stock se modifica desde Movimientos.
                        </small>
                    </FormGroup>

                ) : (

                    <FormGroup label="Stock inicial">
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
                    </FormGroup>
                )
            }

            <FormGroup label="Categoría">
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
            </FormGroup>

            <FormGroup label="Proveedor">
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
            </FormGroup>

            <FormActions>
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
            </FormActions>

            <hr />
        </>
    );
}

export default ProductForm;
