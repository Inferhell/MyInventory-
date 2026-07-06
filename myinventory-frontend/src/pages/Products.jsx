import { useEffect, useState } from "react";

import {
    getProducts,
    createProduct,
    updateProduct,
    disableProduct,
    enableProduct
} from "../services/productService";

import ProductForm from "../components/ProductForm";

import AlertMessage from "../components/AlertMessage";


import PageHeader from "../components/PageHeader";

import SearchInput from "../components/SearchInput";
import ShowInactiveCheckbox from "../components/ShowInactiveCheckbox";


import ConfirmDialog from "../components/ConfirmDialog";
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

import ProductTable from "../components/ProductTable";


function Products() {


    const {
    hasPermission
} = useAuth();


const canWriteProduct =
    hasPermission("PRODUCT_WRITE");

const canChangeProductStatus =
    hasPermission("PRODUCT_STATUS_CHANGE");

    const showProductActions =
    canWriteProduct || canChangeProductStatus;

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

    const [confirmDialog, setConfirmDialog] =
        useState({
            isOpen: false,
            title: "",
            message: "",
            confirmText: "Confirmar",
            variant: "danger",
            onConfirm: null
        });




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

    const closeConfirmDialog = () => {

        setConfirmDialog({
            isOpen: false,
            title: "",
            message: "",
            confirmText: "Confirmar",
            variant: "danger",
            onConfirm: null
        });
    };

    const handleConfirmDialog = async () => {

        if (confirmDialog.onConfirm) {
            await confirmDialog.onConfirm();
        }

        closeConfirmDialog();
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

    const handleDisableProduct = (id) => {

        clearMessages();

        setConfirmDialog({
            isOpen: true,
            title: "Desactivar producto",
            message: "¿Seguro que deseas desactivar este producto?",
            confirmText: "Desactivar",
            variant: "danger",
            onConfirm: async () => {

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
            }
        });
    };

    const handleEnableProduct = (id) => {

        clearMessages();

        setConfirmDialog({
            isOpen: true,
            title: "Reactivar producto",
            message: "¿Seguro que deseas reactivar este producto?",
            confirmText: "Reactivar",
            variant: "success",
            onConfirm: async () => {

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
            }
        });
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

            <PageHeader
    title="Productos"
    subtitle="Consulta y administración del inventario"
/>
         <AlertMessage
    type="success"
    message={message}
/>

<AlertMessage
    type="error"
    message={errorMessage}
/>
<ProductForm
    canWriteProduct={canWriteProduct}
    editingId={editingId}
    name={name}
    setName={setName}
    description={description}
    setDescription={setDescription}
    price={price}
    setPrice={setPrice}
    stock={stock}
    setStock={setStock}
    categoryId={categoryId}
    setCategoryId={setCategoryId}
    supplierId={supplierId}
    setSupplierId={setSupplierId}
    activeCategories={activeCategories}
    activeSuppliers={activeSuppliers}
    loading={loading}
    handleSaveProduct={handleSaveProduct}
    clearForm={clearForm}
/>
            <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Buscar producto..."
            />

            <br />
            <br />

            <ShowInactiveCheckbox
                checked={showInactive}
                onChange={setShowInactive}
            />

            <br />
            <br />

<ProductTable
    products={filteredProducts}
    loading={loading}
    showProductActions={showProductActions}
    canWriteProduct={canWriteProduct}
    canChangeProductStatus={canChangeProductStatus}
    handleEditProduct={handleEditProduct}
    handleDisableProduct={handleDisableProduct}
    handleEnableProduct={handleEnableProduct}
/>


            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                title={confirmDialog.title}
                message={confirmDialog.message}
                confirmText={confirmDialog.confirmText}
                variant={confirmDialog.variant}
                loading={loading}
                onConfirm={handleConfirmDialog}
                onCancel={closeConfirmDialog}
            />

        </div>
    );
}

export default Products;