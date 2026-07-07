import MovementForm from "../components/MovementForm";
import MovementTable from "../components/MovementTable";

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
    useAuth
} from "../hooks/useAuth";

import PageHeader from "../components/PageHeader";

import SearchInput from "../components/SearchInput";

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

            <PageHeader
                title="Movimientos"
                subtitle="Registra entradas y salidas, y consulta el historial"
            />

            <AlertMessage
    type="success"
    message={message}
/>

<AlertMessage
    type="error"
    message={errorMessage}
/>

<MovementForm
    canCreateMovement={canCreateMovement}
    productId={productId}
    setProductId={setProductId}
    quantity={quantity}
    setQuantity={setQuantity}
    observation={observation}
    setObservation={setObservation}
    movementType={type}
    setMovementType={setType}
    activeProducts={activeProducts}
    loading={loading}
    handleRegisterMovement={handleSubmit}
/>

            <h2>
                Historial de Movimientos
            </h2>

            <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Buscar movimiento..."
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

<MovementTable
    movements={filteredMovements}
/>

        </div>
    );
}

export default Movements;