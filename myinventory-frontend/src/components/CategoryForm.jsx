import ActionButton from "./ActionButton";

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

            <hr />
        </>
    );
}

export default CategoryForm;