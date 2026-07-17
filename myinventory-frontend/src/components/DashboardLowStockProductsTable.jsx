import StockBadge from "./StockBadge";

function DashboardLowStockProductsTable({
    products = []
}) {

    if (products.length === 0) {
        return (
            <p>
                No hay productos con stock bajo o agotado.
            </p>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Proveedor</th>
                </tr>
            </thead>

            <tbody>
                {
                    products.map(product => (

                        <tr key={product.id}>
                            <td>
                                {product.name}
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
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default DashboardLowStockProductsTable;