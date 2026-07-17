import MovementTypeBadge from "./MovementTypeBadge";

import {
    formatDate
} from "../utils/formatDate";

function DashboardRecentMovementsTable({
    movements = []
}) {

    if (movements.length === 0) {
        return (
            <p>
                No hay movimientos recientes para mostrar.
            </p>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Stock antes</th>
                    <th>Stock después</th>
                    <th>Usuario</th>
                    <th>Fecha</th>
                </tr>
            </thead>

            <tbody>
                {
                    movements.map(movement => (

                        <tr key={movement.id}>
                            <td>
                                {movement.productName || "-"}
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
                                {formatDate(movement.createdAt)}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default DashboardRecentMovementsTable;