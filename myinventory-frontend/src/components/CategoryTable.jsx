import ActionButton from "./ActionButton";
import StatusBadge from "./StatusBadge";
import TableContainer from "./TableContainer";
import TableActions from "./TableActions";

import {
    formatDate
} from "../utils/formatDate";

function CategoryTable({
    categories,
    loading,
    showCategoryActions,
    canWriteCategory,
    canChangeCategoryStatus,
    handleEditCategory,
    handleDisableCategory,
    handleEnableCategory
}) {

    return (
        <TableContainer>
        <table>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Activo</th>
                    <th>Creado</th>
                    <th>Actualizado</th>

                    {
                        showCategoryActions && (
                            <th>Acciones</th>
                        )
                    }
                </tr>
            </thead>

            <tbody>
                {
                    categories.length === 0 ? (

                        <tr>
                            <td colSpan={showCategoryActions ? 7 : 6}>
                                No hay categorías para mostrar
                            </td>
                        </tr>

                    ) : (

                        categories.map(category => (

                            <tr key={category.id}>

                                <td>
                                    {category.id}
                                </td>

                                <td>
                                    {category.name}
                                </td>

                                <td>
                                    {category.description}
                                </td>

                                <td>
                                    <StatusBadge active={category.active} />
                                </td>

                                <td>
                                    {formatDate(category.createdAt)}
                                </td>

                                <td>
                                    {formatDate(category.updatedAt)}
                                </td>

                                {
                                    showCategoryActions && (

                                <td>
                                            <TableActions>

                                                {
                                                    canWriteCategory && category.active ? (

                                                    <ActionButton
                                                        variant="primary"
                                                        onClick={() =>
                                                            handleEditCategory(category)
                                                        }
                                                        disabled={loading}
                                                    >
                                                        Editar
                                                    </ActionButton>

                                                ) : !category.active && canWriteCategory ? (

                                                    <span>
                                                        Reactivar para editar
                                                    </span>

                                                ) : null
                                            }

                                            {
                                                canChangeCategoryStatus && (

                                                    category.active ? (

                                                        <ActionButton
                                                            variant="danger"
                                                            onClick={() =>
                                                                handleDisableCategory(category.id)
                                                            }
                                                            disabled={loading}
                                                        >
                                                            Desactivar
                                                        </ActionButton>

                                                    ) : (

                                                        <ActionButton
                                                            variant="success"
                                                            onClick={() =>
                                                                handleEnableCategory(category.id)
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

export default CategoryTable;