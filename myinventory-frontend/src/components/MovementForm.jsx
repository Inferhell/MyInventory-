import ActionButton from "./ActionButton";

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

            <br />
            <br />

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

            <br />
            <br />

            <input
                type="text"
                placeholder="Observación"
                value={observation}
                onChange={(event) =>
                    setObservation(event.target.value)
                }
                disabled={loading}
            />

            <br />
            <br />

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

            <br />
            <br />

            <ActionButton
                variant="primary"
                onClick={handleRegisterMovement}
                disabled={loading}
            >
                Registrar Movimiento
            </ActionButton>

            <hr />
        </>
    );
}

export default MovementForm;