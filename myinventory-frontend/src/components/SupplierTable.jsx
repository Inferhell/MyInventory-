import ActionButton from "./ActionButton";
import StatusBadge from "./StatusBadge";
import TableActions from "./TableActions";

import {
    formatDate
} from "../utils/formatDate";

import TableContainer from "./TableContainer";

function SupplierTable({
    suppliers,
    loading,
    showSupplierActions,
    canWriteSupplier,
    canChangeSupplierStatus,
    handleEditSupplier,
    handleDisableSupplier,
    handleEnableSupplier
}) {

    return (
        <TableContainer>
        <table>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th>Activo</th>
                    <th>Creado</th>
                    <th>Actualizado</th>

                    {
                        showSupplierActions && (
                            <th>Acciones</th>
                        )
                    }
                </tr>
            </thead>

            <tbody>
                {
                    suppliers.length === 0 ? (

                        <tr>
                            <td colSpan={showSupplierActions ? 9 : 8}>
                                No hay proveedores para mostrar
                            </td>
                        </tr>

                    ) : (

                        suppliers.map(supplier => (

                            <tr key={supplier.id}>

                                <td>
                                    {supplier.id}
                                </td>

                                <td>
                                    {supplier.name}
                                </td>

                                <td>
                                    {supplier.email}
                                </td>

                                <td>
                                    {supplier.phone}
                                </td>

                                <td>
                                    {supplier.address}
                                </td>

                                <td>
                                    <StatusBadge active={supplier.active} />
                                </td>

                                <td>
                                    {formatDate(supplier.createdAt)}
                                </td>

                                <td>
                                    {formatDate(supplier.updatedAt)}
                                </td>

                                {
                                    showSupplierActions && (

                                <td>
                                            <TableActions>

                                                {
                                                     canWriteSupplier && supplier.active ? (

                                                    <ActionButton
                                                        variant="primary"
                                                        onClick={() =>
                                                            handleEditSupplier(supplier)
                                                        }
                                                        disabled={loading}
                                                    >
                                                        Editar
                                                    </ActionButton>

                                                ) : !supplier.active && canWriteSupplier ? (

                                                    <span>
                                                        Reactivar para editar
                                                    </span>

                                                ) : null
                                            }

                                            {
                                                canChangeSupplierStatus && (

                                                    supplier.active ? (

                                                        <ActionButton
                                                            variant="danger"
                                                            onClick={() =>
                                                                handleDisableSupplier(supplier.id)
                                                            }
                                                            disabled={loading}
                                                        >
                                                            Desactivar
                                                        </ActionButton>

                                                    ) : (

                                                        <ActionButton
                                                            variant="success"
                                                            onClick={() =>
                                                                handleEnableSupplier(supplier.id)
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

export default SupplierTable;