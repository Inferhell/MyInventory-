import ActionButton from "./ActionButton";

function SupplierForm({
    canWriteSupplier,
    editingId,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    loading,
    handleSaveSupplier,
    clearForm
}) {

    if (!canWriteSupplier) {
        return null;
    }

    return (
        <>
            <h2>
                {
                    editingId
                        ? "Editar Proveedor"
                        : "Nuevo Proveedor"
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
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(event) =>
                    setEmail(event.target.value)
                }
                disabled={loading}
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Teléfono"
                value={phone}
                onChange={(event) =>
                    setPhone(event.target.value)
                }
                disabled={loading}
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Dirección"
                value={address}
                onChange={(event) =>
                    setAddress(event.target.value)
                }
                disabled={loading}
            />

            <br />
            <br />

            <ActionButton
                variant="primary"
                onClick={handleSaveSupplier}
                disabled={loading}
            >
                {
                    editingId
                        ? "Actualizar Proveedor"
                        : "Crear Proveedor"
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

export default SupplierForm;