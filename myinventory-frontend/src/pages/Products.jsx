import { useEffect, useState } from "react";

import {
    getProducts,
    createProduct,
    updateProduct,
    disableProduct,
    enableProduct
} from "../services/productService";

import {
    getCategories
} from "../services/categoryService";

import {
    getSuppliers
} from "../services/supplierService";
import {
    getApiErrorMessage
} from "../utils/getApiErrorMessage";
import {
    useAuth
} from "../hooks/useAuth";


function Products() {


    const {
    hasPermission
} = useAuth();

const canWriteProduct =
    hasPermission("PRODUCT_WRITE");

const canChangeProductStatus =
    hasPermission("PRODUCT_STATUS_CHANGE");

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [supplierId, setSupplierId] = useState("");

    const [search, setSearch] = useState("");
    const [showInactive, setShowInactive] = useState(true);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");



    const loadProducts = async () => {

        try {

            const data = await getProducts();

            setProducts(data);

        } catch (error) {

            console.error(error);

            setErrorMessage(
                "Error al cargar productos"
            );
        }
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
    
    useEffect(() => {

    let cancelled = false;

    getProducts()
        .then((productsData) => {

            if (!cancelled) {
                setProducts(productsData);
            }
        })
        .catch((error) => {

            console.error(error);

            if (!cancelled) {
                setErrorMessage(
                    getErrorMessage(
                        error,
                        "Error al cargar productos"
                    )
                );
            }
        });

    return () => {
        cancelled = true;
    };

}, []);


useEffect(() => {

    if (!canWriteProduct) {
        return;
    }

    let cancelled = false;

    Promise.all([
        getCategories(),
        getSuppliers()
    ])
        .then(([
            categoriesData,
            suppliersData
        ]) => {

            if (!cancelled) {
                setCategories(categoriesData);
                setSuppliers(suppliersData);
            }
        })
        .catch((error) => {

            console.error(error);

            if (!cancelled) {
                setErrorMessage(
                    getErrorMessage(
                        error,
                        "Error al cargar categorías o proveedores"
                    )
                );
            }
        });

    return () => {
        cancelled = true;
    };

}, [canWriteProduct]);
        
    


    const clearMessages = () => {

        setMessage("");
        setErrorMessage("");
    };

    const resetForm = () => {

        setEditingId(null);

        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setCategoryId("");
        setSupplierId("");
    };

    const clearForm = () => {

        resetForm();

        clearMessages();
    };

   

    const validateForm = () => {

        if (!name.trim()) {

            setErrorMessage(
                "El nombre del producto es obligatorio"
            );

            return false;
        }

        if (!price || Number(price) <= 0) {

            setErrorMessage(
                "El precio debe ser mayor que cero"
            );

            return false;
        }
            if (!editingId && (stock === "" || Number(stock) < 0)) {

                setErrorMessage(
                    "El stock inicial no puede ser negativo"
                );

                return false;
            }

        if (!categoryId) {

            setErrorMessage(
                "Debes seleccionar una categoría"
            );

            return false;
        }

        if (!supplierId) {

            setErrorMessage(
                "Debes seleccionar un proveedor"
            );

            return false;
        }

        return true;
    };

    const handleSaveProduct = async () => {

        clearMessages();

        if (!validateForm()) {
            return;
        }

        try {

            setLoading(true);

                const payload = {
            name: name.trim(),
            description: description.trim(),
            price: Number(price),
            categoryId: Number(categoryId),
            supplierId: Number(supplierId)
        };

        if (!editingId) {
            payload.stock = Number(stock);
        }
            if (editingId) {

                await updateProduct(
                    editingId,
                    payload
                );

                setMessage(
                    "Producto actualizado correctamente"
                );

            } else {

                await createProduct(
                    payload
                );

                setMessage(
                    "Producto creado correctamente"
                );
            }

            await loadProducts();

            resetForm();

        } catch (error) {

            console.error(error);

            setErrorMessage(
                getErrorMessage(
                    error,
                    "Error al guardar producto"
                )
            );

        } finally {

            setLoading(false);
        }
    };

    const handleDisableProduct = async (id) => {

        clearMessages();

        const confirmDisable =
            window.confirm(
                "¿Seguro que deseas desactivar este producto?"
            );

        if (!confirmDisable) {
            return;
        }

        try {

            setLoading(true);

            await disableProduct(id);

            await loadProducts();

            setMessage(
                "Producto desactivado correctamente"
            );

            if (editingId === id) {
                resetForm();
            }

        } catch (error) {

            console.error(error);

            setErrorMessage(
                getErrorMessage(
                    error,
                    "Error al desactivar producto"
                )
            );

        } finally {

            setLoading(false);
        }
    };

    const handleEnableProduct = async (id) => {

        clearMessages();

        try {

            setLoading(true);

            await enableProduct(id);

            await loadProducts();

            setMessage(
                "Producto reactivado correctamente"
            );

        } catch (error) {

            console.error(error);

            setErrorMessage(
                getErrorMessage(
                    error,
                    "Error al reactivar producto"
                )
            );

        } finally {

            setLoading(false);
        }
    };

    const handleEditProduct = (product) => {

        clearMessages();

        if (!product.active) {

            setErrorMessage(
                "No puedes editar un producto inactivo. Primero debes reactivarlo."
            );

            return;
        }

        setEditingId(product.id);

        setName(product.name);
        setDescription(product.description || "");
        setPrice(product.price);
        setStock(product.stock);
        setCategoryId(product.categoryId || "");
        setSupplierId(product.supplierId || "");
    };

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString();
    };

    const getStockText = (productStock) => {

        if (productStock === 0) {
            return "🔴 Agotado";
        }

        if (productStock <= 5) {
            return `🟡 Bajo (${productStock})`;
        }

        return `🟢 Normal (${productStock})`;
    };

    const activeCategories =
        categories.filter(category => category.active);

    const activeSuppliers =
        suppliers.filter(supplier => supplier.active);

    const filteredProducts =
        products.filter(product => {

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                product.name
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                product.categoryName
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                product.supplierName
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesStatus =
                showInactive || product.active;

            return matchesSearch && matchesStatus;
        });

    return (
        <div>

            <h1>Productos</h1>
            {
    message && (
        <p style={{ color: "green" }}>
            {message}
        </p>
    )
}

{
    errorMessage && (
        <p style={{ color: "red" }}>
            {errorMessage}
        </p>
    )
}

            {
    canWriteProduct && (

        <>
            <h2>
                {
                    editingId
                        ? "Editar Producto"
                        : "Nuevo Producto"
                }
            </h2>

            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="number"
                placeholder="Precio"
                value={price}
                min="0"
                onChange={(e) =>
                    setPrice(e.target.value)
                }
            />

            <br />
            <br />

            {
                editingId ? (

                    <p>
                        <strong>Stock actual:</strong>
                        {" "}
                        {getStockText(Number(stock))}
                        <br />
                        <small>
                            El stock se modifica desde Movimientos.
                        </small>
                    </p>

                ) : (

                    <input
                        type="number"
                        placeholder="Stock inicial"
                        value={stock}
                        min="0"
                        onChange={(e) =>
                            setStock(e.target.value)
                        }
                    />
                )
            }

            <br />
            <br />

            <select
                value={categoryId}
                onChange={(e) =>
                    setCategoryId(e.target.value)
                }
            >
                <option value="">
                    Seleccione categoría
                </option>

                {
                    activeCategories.map(category => (

                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))
                }
            </select>

            <br />
            <br />

            <select
                value={supplierId}
                onChange={(e) =>
                    setSupplierId(e.target.value)
                }
            >
                <option value="">
                    Seleccione proveedor
                </option>

                {
                    activeSuppliers.map(supplier => (

                        <option
                            key={supplier.id}
                            value={supplier.id}
                        >
                            {supplier.name}
                        </option>
                    ))
                }
            </select>

            <br />
            <br />

            <button
                onClick={handleSaveProduct}
                disabled={loading}
            >
                {
                    editingId
                        ? "Actualizar Producto"
                        : "Crear Producto"
                }
            </button>

            {
                editingId && (

                    <button
                        onClick={clearForm}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                )
            }

            <hr />
        </>
    )
}

            <input
                type="text"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <br />
            <br />

            <label>

                <input
                    type="checkbox"
                    checked={showInactive}
                    onChange={() =>
                        setShowInactive(!showInactive)
                    }
                />

                Mostrar inactivos

            </label>

            <br />
            <br />

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
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        filteredProducts.length === 0 ? (

                            <tr>
                                <td colSpan="10">
                                    No hay productos para mostrar
                                </td>
                            </tr>

                        ) : (

                            filteredProducts.map(product => (

                                <tr key={product.id}>

                                    <td>
                                        {product.id}
                                    </td>

                                    <td>
                                        {product.name}
                                    </td>

                                    <td>
                                        {product.price}
                                    </td>

                                    <td>
                                        {getStockText(product.stock)}
                                    </td>

                                    <td>
                                        {product.categoryName || "-"}
                                    </td>

                                    <td>
                                        {product.supplierName || "-"}
                                    </td>

                                    <td>
                                        {
                                            product.active
                                                ? "Sí"
                                                : "No"
                                        }
                                    </td>

                                    <td>
                                        {formatDate(product.createdAt)}
                                    </td>

                                    <td>
                                        {formatDate(product.updatedAt)}
                                    </td>

                                    <td>

                                       {
                    canWriteProduct && product.active ? (

                        <button
                            onClick={() =>
                                handleEditProduct(product)
                            }
                            disabled={loading}
                        >
                            Editar
                        </button>

                    ) : !product.active && canWriteProduct ? (

                        <span>
                            Reactivar para editar
                        </span>

                    ) : null
                }
{
    canChangeProductStatus && (

        product.active ? (

            <button
                onClick={() =>
                    handleDisableProduct(
                        product.id
                    )
                }
                disabled={loading}
            >
                Desactivar
            </button>

        ) : (

            <button
                onClick={() =>
                    handleEnableProduct(
                        product.id
                    )
                }
                disabled={loading}
            >
                Reactivar
            </button>
        )
    )
}

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

export default Products;