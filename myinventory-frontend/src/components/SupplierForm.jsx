import ActionButton from "./ActionButton";
import FormActions from "./FormActions";
import FormGroup from "./FormGroup";

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

            <FormGroup label="Correo">
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    disabled={loading}
                />
            </FormGroup>

            <FormGroup label="Teléfono">
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(event) =>
                        setPhone(event.target.value)
                    }
                    disabled={loading}
                />
            </FormGroup>

            <FormGroup label="Dirección">
                <input
                    type="text"
                    placeholder="Dirección"
                    value={address}
                    onChange={(event) =>
                        setAddress(event.target.value)
                    }
                    disabled={loading}
                />
            </FormGroup>

            <FormActions>
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
            </FormActions>

            <hr />
        </>
    );
}

export default SupplierForm;
