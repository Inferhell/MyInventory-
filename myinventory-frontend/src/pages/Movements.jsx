import MovementForm from "../components/MovementForm";
import MovementTable from "../components/MovementTable";

import { useEffect, useState } from "react";

import {
    getMovements,
    registerEntry,
    registerExit
} from "../services/movementService";

import {
    compareDate,
    compareNumber,
    sortByOption
} from "../utils/sortUtils";

import AlertMessage from "../components/AlertMessage";

import FilterSelect from "../components/FilterSelect";
import TableToolbar from "../components/TableToolbar";


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

    const [sortOption, setSortOption] =
        useState("recent");

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


    const movementSortOptions = [
    {
        value: "recent",
        label: "Más recientes"
    },
    {
        value: "oldest",
        label: "Más antiguos"
    },
    {
        value: "quantityAsc",
        label: "Cantidad menor a mayor"
    },
    {
        value: "quantityDesc",
        label: "Cantidad mayor a menor"
    }
];

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


        const movementSorters = {
    recent: (first, second) =>
        compareDate(second.createdAt, first.createdAt),

    oldest: (first, second) =>
        compareDate(first.createdAt, second.createdAt),

    quantityAsc: (first, second) =>
        compareNumber(first.quantity, second.quantity),

    quantityDesc: (first, second) =>
        compareNumber(second.quantity, first.quantity)
};

const sortedMovements =
    sortByOption(
        filteredMovements,
        sortOption,
        movementSorters
    );

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

<TableToolbar>

    <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Buscar movimiento..."
    />

    <FilterSelect
        label="Tipo"
        value={typeFilter}
        onChange={setTypeFilter}
        options={[
            {
                value: "ALL",
                label: "Todos los tipos"
            },
            {
                value: "ENTRY",
                label: "Entradas"
            },
            {
                value: "EXIT",
                label: "Salidas"
            },
            {
                value: "INITIAL_BALANCE",
                label: "Saldos iniciales"
            }
        ]}
    />

    <FilterSelect
        label="Producto"
        value={productFilter}
        onChange={setProductFilter}
        options={[
            {
                value: "ALL",
                label: "Todos los productos"
            },
            ...products.map(product => ({
                value: String(product.id),
                label: product.name
            }))
        ]}
    />

    <FilterSelect
        label="Ordenar por"
        value={sortOption}
        onChange={setSortOption}
        options={movementSortOptions}
    />

</TableToolbar>

            <br />
            <br />

<MovementTable
    movements={sortedMovements}
/>

        </div>
    );
}

export default Movements;