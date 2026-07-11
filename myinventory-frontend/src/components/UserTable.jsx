import ActionButton from "./ActionButton";
import RoleBadge from "./RoleBadge";
import StatusBadge from "./StatusBadge";
import TableContainer from "./TableContainer";
import TableActions from "./TableActions";

import {
    formatDate
} from "../utils/formatDate";

function UserTable({
    users,
    loading,
    currentUser,
    showUserActions,
    canEditUser,
    canChangeUserStatus,
    handleEditUser,
    handleDisableUser,
    handleEnableUser
}) {

    return (
        <TableContainer>
        <table border="1">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Activo</th>
                    <th>Creado</th>
                    <th>Actualizado</th>

                    {
                        showUserActions && (
                            <th>Acciones</th>
                        )
                    }
                </tr>
            </thead>

            <tbody>
                {
                    users.length === 0 ? (

                        <tr>
                            <td colSpan={showUserActions ? 8 : 7}>
                                No hay usuarios para mostrar
                            </td>
                        </tr>

                    ) : (

                        users.map(user => (

                            <tr key={user.id}>

                                <td>
                                    {user.id}
                                </td>

                                <td>
                                    {user.name}
                                </td>

                                <td>
                                    {user.email}
                                </td>

                                <td>
                                    <RoleBadge role={user.role} />
                                </td>

                                <td>
                                    <StatusBadge active={user.active} />
                                </td>

                                <td>
                                    {formatDate(user.createdAt)}
                                </td>

                                <td>
                                    {formatDate(user.updatedAt)}
                                </td>

                                {
                                    showUserActions && (

                                         <td>
                                        <TableActions>

                                            {
                                                canEditUser && user.active ? (

                                                    <ActionButton
                                                        variant="primary"
                                                        onClick={() =>
                                                            handleEditUser(user)
                                                        }
                                                        disabled={loading}
                                                    >
                                                        Editar
                                                    </ActionButton>

                                                ) : !user.active && canEditUser ? (

                                                    <span>
                                                        Reactivar para editar
                                                    </span>

                                                ) : null
                                            }

                                            {
                                                canChangeUserStatus && (

                                                    user.active ? (

                                                        user.email !== currentUser?.email && (

                                                            <ActionButton
                                                                variant="danger"
                                                                onClick={() =>
                                                                    handleDisableUser(user.id)
                                                                }
                                                                disabled={loading}
                                                            >
                                                                Desactivar
                                                            </ActionButton>
                                                        )

                                                    ) : (

                                                        <ActionButton
                                                            variant="success"
                                                            onClick={() =>
                                                                handleEnableUser(user.id)
                                                            }
                                                            disabled={loading}
                                                        >
                                                            Reactivar
                                                        </ActionButton>
                                                    )
                                                )
                                            }

                                        </TableActions>
                                    </td>
                                    )
                                }

                            </tr>
                        ))
                    )
                }
            </tbody>

        </table>
        </TableContainer>

    );
}

export default UserTable;