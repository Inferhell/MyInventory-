import ActionButton from "./ActionButton";
import FormActions from "./FormActions";
import FormGroup from "./FormGroup";

function MovementForm({
    canCreateMovement,
    productId,
    setProductId,
    quantity,
    setQuantity,
    observation,
    setObservation,
    movementType,
    setMovementType,
    activeProducts,
    loading,
    handleRegisterMovement
}) {

    if (!canCreateMovement) {
        return null;
    }

    return (
        <>
            <h2>
                Registrar Movimiento
            </h2>

            <FormGroup label="Producto">
                <select
                    value={productId}
                    onChange={(event) =>
                        setProductId(event.target.value)
                    }
                    disabled={loading}
                >
                    <option value="">
                        Seleccione producto
                    </option>

                    {
                        activeProducts.map(product => (

                            <option
                                key={product.id}
                                value={product.id}
                            >
                                {product.name}
                            </option>
                        ))
                    }
                </select>
            </FormGroup>

            <FormGroup label="Cantidad">
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={quantity}
                    min="1"
                    onChange={(event) =>
                        setQuantity(event.target.value)
                    }
                    disabled={loading}
                />
            </FormGroup>

            <FormGroup label="Observación">
                <input
                    type="text"
                    placeholder="Observación"
                    value={observation}
                    onChange={(event) =>
                        setObservation(event.target.value)
                    }
                    disabled={loading}
                />
            </FormGroup>

            <FormGroup label="Tipo de movimiento">
                <select
                    value={movementType}
                    onChange={(event) =>
                        setMovementType(event.target.value)
                    }
                    disabled={loading}
                >
                    <option value="ENTRY">
                        Entrada
                    </option>

                    <option value="EXIT">
                        Salida
                    </option>
                </select>
            </FormGroup>

            <FormActions>
                <ActionButton
                    variant="primary"
                    onClick={handleRegisterMovement}
                    disabled={loading}
                >
                    Registrar Movimiento
                </ActionButton>
            </FormActions>

            <hr />
        </>
    );
}

export default MovementForm;
