import ActionButton from "./ActionButton";

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

            {
                !editingId && (

                    <>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            disabled={loading}
                        />

                        <br />
                        <br />
                    </>
                )
            }

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

            <br />
            <br />

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

            <hr />
        </>
    );
}

export default UserForm;