import ActionButton from "./ActionButton";
import FormActions from "./FormActions";
import FormGroup from "./FormGroup";

function CategoryForm({
    canWriteCategory,
    editingId,
    name,
    setName,
    description,
    setDescription,
    loading,
    handleSaveCategory,
    clearForm
}) {

    if (!canWriteCategory) {
        return null;
    }

    return (
        <>
            <h2>
                {
                    editingId
                        ? "Editar Categoría"
                        : "Nueva Categoría"
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

            <FormActions>
                <ActionButton
                    variant="primary"
                    onClick={handleSaveCategory}
                    disabled={loading}
                >
                    {
                        editingId
                            ? "Actualizar Categoría"
                            : "Crear Categoría"
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

export default CategoryForm;
