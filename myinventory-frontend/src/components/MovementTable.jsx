import MovementTypeBadge from "./MovementTypeBadge";

import {
    formatDate
} from "../utils/formatDate";

import TableContainer from "./TableContainer";

function MovementTable({
    movements
}) {

    return (
        <TableContainer>
        <table>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Proveedor</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Stock antes</th>
                    <th>Stock después</th>
                    <th>Usuario</th>
                    <th>Observación</th>
                    <th>Fecha</th>
                </tr>
            </thead>

            <tbody>
                {
                    movements.length === 0 ? (

                        <tr>
                            <td colSpan="11">
                                No hay movimientos para mostrar
                            </td>
                        </tr>

                    ) : (

                        movements.map(movement => (

                            <tr key={movement.id}>

                                <td>
                                    {movement.id}
                                </td>

                                <td>
                                    {movement.productName || "-"}
                                </td>

                                <td>
                                    {movement.categoryName || "-"}
                                </td>

                                <td>
                                    {movement.supplierName || "-"}
                                </td>

                                <td>
                                    <MovementTypeBadge type={movement.type} />
                                </td>

                                <td>
                                    {movement.quantity}
                                </td>

                                <td>
                                    {movement.stockBefore}
                                </td>

                                <td>
                                    {movement.stockAfter}
                                </td>

                                <td>
                                    {movement.userName || "-"}
                                </td>

                                <td>
                                    {movement.observation || "-"}
                                </td>

                                <td>
                                    {formatDate(movement.createdAt)}
                                </td>

                            </tr>
                        ))
                    )
                }
            </tbody>

        </table>
        </TableContainer>
    );
}

export default MovementTable;