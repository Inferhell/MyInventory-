import ActionButton from "./ActionButton";
import StatusBadge from "./StatusBadge";
import StockBadge from "./StockBadge";

import {
    formatCurrency
} from "../utils/formatCurrency";

import {
    formatDate
} from "../utils/formatDate";

function ProductTable({
    products,
    loading,
    showProductActions,
    canWriteProduct,
    canChangeProductStatus,
    handleEditProduct,
    handleDisableProduct,
    handleEnableProduct
}) {

    return (
        <table border="1">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Proveedor</th>
                    <th>Activo</th>
                    <th>Creado</th>
                    <th>Actualizado</th>

                    {
                        showProductActions && (
                            <th>Acciones</th>
                        )
                    }
                </tr>
            </thead>

            <tbody>

                {
                    products.length === 0 ? (

                        <tr>
                            <td colSpan={showProductActions ? 10 : 9}>
                                No hay productos para mostrar
                            </td>
                        </tr>

                    ) : (

                        products.map(product => (

                            <tr key={product.id}>

                                <td>
                                    {product.id}
                                </td>

                                <td>
                                    {product.name}
                                </td>

                                <td>
                                    {formatCurrency(product.price)}
                                </td>

                                <td>
                                    <StockBadge stock={product.stock} />
                                </td>

                                <td>
                                    {product.categoryName || "-"}
                                </td>

                                <td>
                                    {product.supplierName || "-"}
                                </td>

                                <td>
                                    <StatusBadge active={product.active} />
                                </td>

                                <td>
                                    {formatDate(product.createdAt)}
                                </td>

                                <td>
                                    {formatDate(product.updatedAt)}
                                </td>

                                {
                                    showProductActions && (

                                        <td>

                                            {
                                                canWriteProduct && product.active ? (

                                                    <ActionButton
                                                        variant="primary"
                                                        onClick={() =>
                                                            handleEditProduct(product)
                                                        }
                                                        disabled={loading}
                                                    >
                                                        Editar
                                                    </ActionButton>

                                                ) : !product.active && canWriteProduct ? (

                                                    <span>
                                                        Reactivar para editar
                                                    </span>

                                                ) : null
                                            }

                                            {
                                                canChangeProductStatus && (

                                                    product.active ? (

                                                        <ActionButton
                                                            variant="danger"
                                                            onClick={() =>
                                                                handleDisableProduct(product.id)
                                                            }
                                                            disabled={loading}
                                                        >
                                                            Desactivar
                                                        </ActionButton>

                                                    ) : (

                                                        <ActionButton
                                                            variant="success"
                                                            onClick={() =>
                                                                handleEnableProduct(product.id)
                                                            }
                                                            disabled={loading}
                                                        >
                                                            Reactivar
                                                        </ActionButton>
                                                    )
                                                )
                                            }

                                        </td>
                                    )
                                }

                            </tr>
                        ))
                    )
                }

            </tbody>

        </table>
    );
}

export default ProductTable;