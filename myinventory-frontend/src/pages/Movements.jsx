import { useEffect, useState } from "react";

import {
    getMovements,
    registerEntry,
    registerExit
} from "../services/movementService";

import AlertMessage from "../components/AlertMessage";

import {
    getProducts
} from "../services/productService";

import {
    getApiErrorMessage
} from "../utils/getApiErrorMessage";

import {
    formatMovementType
} from "../utils/formatMovementType";

import {
    useAuth
} from "../hooks/useAuth";

function Movements() {

    const {
    hasPermission
} = useAuth();

const canCreateMovement =
    hasPermission("MOVEMENT_CREATE");

    const [movements, setMovements] =
        useState([]);

    const [products, setProducts] =
        useState([]);

    const [productId, setProductId] =
        useState("");

    const [quantity, setQuantity] =
        useState("");

    const [observation, setObservation] =
        useState("");

    const [type, setType] =
        useState("ENTRY");

    const [search, setSearch] =
        useState("");

    const [typeFilter, setTypeFilter] =
        useState("ALL");

    const [productFilter, setProductFilter] =
        useState("ALL");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [errorMessage, setErrorMessage] =
        useState("");

         const loadMovements = async () => {

        try {

            const data =
                await getMovements();

            setMovements(data);

        } catch (error) {

            console.error(error);

            setErrorMessage(
                "Error al cargar movimientos"
            );
        }
    };

    const loadProducts = async () => {

        try {

            const data =
                await getProducts();

            setProducts(data);

        } catch (error) {

            console.error(error);

            setErrorMessage(
                "Error al cargar productos"
            );
        }
    };

   useEffect(() => {

    let cancelled = false;

    Promise.all([
        getMovements(),
        getProducts()
    ])
        .then(([
            movementsData,
            productsData
        ]) => {

            if (!cancelled) {

                setMovements(movementsData);
                setProducts(productsData);
            }
        })
        .catch((error) => {

            console.error(error);

            if (!cancelled) {
                setErrorMessage(
                    "Error al cargar datos iniciales de movimientos"
                );
            }
        });

    return () => {
        cancelled = true;
    };

}, []);





    const clearMessages = () => {

        setMessage("");
        setErrorMessage("");
    };

    const clearForm = () => {

        setProductId("");
        setQuantity("");
        setObservation("");
        setType("ENTRY");
    };

       const getErrorMessage = (
    error,
    defaultMessage
) => {

    return getApiErrorMessage(
        error,
        defaultMessage
    );
};

    const selectedProduct =
        products.find(product =>
            String(product.id) === String(productId)
        );

    const activeProducts =
        products.filter(product => product.active);

    const validateForm = () => {

        if (!productId) {

            setErrorMessage(
                "Debes seleccionar un producto"
            );

            return false;
        }

        if (!quantity || Number(quantity) <= 0) {

            setErrorMessage(
                "La cantidad debe ser mayor que cero"
            );

            return false;
        }

        if (
            type === "EXIT"
            && selectedProduct
            && Number(quantity) > selectedProduct.stock
        ) {

            setErrorMessage(
                `Stock insuficiente. Stock actual: ${selectedProduct.stock}`
            );

            return false;
        }

        return true;
    };

    const handleSubmit = async () => {

        clearMessages();

        if (!validateForm()) {
            return;
        }

        const movementData = {
            productId: Number(productId),
            quantity: Number(quantity),
            observation: observation.trim()
        };

        try {

            setLoading(true);

            if (type === "ENTRY") {

                await registerEntry(
                    movementData
                );

                setMessage(
                    "Entrada registrada correctamente"
                );

            } else {

                await registerExit(
                    movementData
                );

                setMessage(
                    "Salida registrada correctamente"
                );
            }

            clearForm();

            await loadMovements();
            await loadProducts();

        } catch (error) {

            console.error(error);

            setErrorMessage(
                getErrorMessage(
                    error,
                    "Error al registrar movimiento"
                )
            );

        } finally {

            setLoading(false);
        }
    };

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString();
    };



  const getTypeIcon = (movementType) => {

    if (movementType === "ENTRY") {
        return "🟢";
    }

    if (movementType === "EXIT") {
        return "🔴";
    }

    if (movementType === "INITIAL_BALANCE") {
        return "🔵";
    }

    return "";
};


    const getStockText = (stock) => {

        if (stock === 0) {
            return "🔴 Agotado";
        }

        if (stock <= 5) {
            return `🟡 Bajo (${stock})`;
        }

        return `🟢 Normal (${stock})`;
    };

    const filteredMovements =
        movements.filter(movement => {

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                movement.productName
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                movement.categoryName
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                movement.supplierName
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                movement.userName
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                movement.observation
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesType =
                typeFilter === "ALL"
                || movement.type === typeFilter;

            const matchesProduct =
                productFilter === "ALL"
                || String(movement.productId) === productFilter;

            return (
                matchesSearch
                && matchesType
                && matchesProduct
            );
        });

    return (

        <div>

            <h1>
                Movimientos
            </h1>

            <AlertMessage
    type="success"
    message={message}
/>

<AlertMessage
    type="error"
    message={errorMessage}
/>

            {
                canCreateMovement && (
                    <>
                        <h2>
                            Registrar Movimiento
                        </h2>

                        <select
                            value={productId}
                            onChange={(e) =>
                                setProductId(e.target.value)
                            }
                        >
                            <option value="">
                                Seleccione producto
                            </option>

                            {
                                activeProducts.map(product => (
                                    <option
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {product.name}
                                        {" "}
                                        | Stock:
                                        {" "}
                                        {product.stock}
                                        {" "}
                                        | Proveedor:
                                        {" "}
                                        {product.supplierName || "-"}
                                    </option>
                                ))
                            }
                        </select>

                        <br />
                        <br />

                        {
                            selectedProduct && (
                                <div>
                                    <strong>
                                        Producto seleccionado:
                                    </strong>

                                    <p>
                                        Nombre: {selectedProduct.name}
                                    </p>

                                    <p>
                                        Categoría: {selectedProduct.categoryName || "-"}
                                    </p>

                                    <p>
                                        Proveedor: {selectedProduct.supplierName || "-"}
                                    </p>

                                    <p>
                                        Stock actual: {getStockText(selectedProduct.stock)}
                                    </p>
                                </div>
                            )
                        }

                        <input
                            type="number"
                            placeholder="Cantidad"
                            value={quantity}
                            min="1"
                            onChange={(e) =>
                                setQuantity(e.target.value)
                            }
                        />

                        <br />
                        <br />

                        <input
                            type="text"
                            placeholder="Observación"
                            value={observation}
                            onChange={(e) =>
                                setObservation(e.target.value)
                            }
                        />

                        <br />
                        <br />

                        <select
                            value={type}
                            onChange={(e) =>
                                setType(e.target.value)
                            }
                        >
                            <option value="ENTRY">
                                Entrada
                            </option>

                            <option value="EXIT">
                                Salida
                            </option>
                        </select>

                        <br />
                        <br />

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {
                                loading
                                    ? "Registrando..."
                                    : "Registrar Movimiento"
                            }
                        </button>

                        <hr />
                    </>
                )
            }

            <h2>
                Historial de Movimientos
            </h2>

            <input
                type="text"
                placeholder="Buscar movimiento..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <br />
            <br />

            <select
                value={typeFilter}
                onChange={(e) =>
                    setTypeFilter(e.target.value)
                }
            >

                <option value="ALL">
                    Todos los tipos
                </option>

                <option value="ENTRY">
                    Entradas
                </option>

                <option value="EXIT">
                    Salidas
                </option>

            </select>

            <br />
            <br />

            <select
                value={productFilter}
                onChange={(e) =>
                    setProductFilter(e.target.value)
                }
            >

                <option value="ALL">
                    Todos los productos
                </option>

                {
                    products.map(product => (

                        <option
                            key={product.id}
                            value={product.id}
                        >
                            {product.name}
                        </option>
                    ))
                }

            </select>

            <br />
            <br />

            <table border="1">

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
                        <th>Fecha</th>
                        <th>Observación</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        filteredMovements.length === 0 ? (

                            <tr>
                                <td colSpan="11">
                                    No hay movimientos para mostrar
                                </td>
                            </tr>

                        ) : (

                            filteredMovements.map(movement => (

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
                                        {getTypeIcon(movement.type)}
                                        {" "}
                                        {formatMovementType(movement.type)}
                                    </td>

                                    <td>
                                        {movement.quantity}
                                    </td>

                                    <td>
    {
        movement.stockBefore !== null
        && movement.stockBefore !== undefined
            ? movement.stockBefore
            : "-"
    }
</td>

<td>
    {
        movement.stockAfter !== null
        && movement.stockAfter !== undefined
            ? getStockText(movement.stockAfter)
            : "-"
    }
</td>

                                    <td>
                                        {movement.userName || "-"}
                                    </td>

                                    <td>
                                        {formatDate(movement.createdAt)}
                                    </td>

                                    <td>
                                        {movement.observation || "-"}
                                    </td>

                                </tr>
                            ))
                        )
                    }

                </tbody>

            </table>

        </div>
    );
}

export default Movements;