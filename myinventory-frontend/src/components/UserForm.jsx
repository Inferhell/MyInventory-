import ActionButton from "./ActionButton";
import FormActions from "./FormActions";
import FormGroup from "./FormGroup";

function UserForm({
    canCreateUser,
    canEditUser,
    editingId,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    loading,
    handleSaveUser,
    clearForm
}) {

    const canShowForm =
        (!editingId && canCreateUser)
        || (editingId && canEditUser);

    if (!canShowForm) {
        return null;
    }

    return (
        <>
            <h2>
                {
                    editingId
                        ? "Editar Usuario"
                        : "Nuevo Usuario"
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

            {
                !editingId && (

                    <FormGroup label="Contraseña">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            disabled={loading}
                        />
                    </FormGroup>
                )
            }

            <FormGroup label="Rol">
                <select
                    value={role}
                    onChange={(event) =>
                        setRole(event.target.value)
                    }
                    disabled={loading}
                >
                    <option value="ADMIN">
                        Administrador
                    </option>

                    <option value="SUPERVISOR">
                        Supervisor
                    </option>

                    <option value="EMPLOYEE">
                        Empleado
                    </option>
                </select>
            </FormGroup>

            <FormActions>
                <ActionButton
                    variant="primary"
                    onClick={handleSaveUser}
                    disabled={loading}
                >
                    {
                        editingId
                            ? "Actualizar Usuario"
                            : "Crear Usuario"
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

export default UserForm;
