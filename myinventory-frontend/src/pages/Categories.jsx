import { useEffect, useState } from "react";

import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";

import FilterSelect from "../components/FilterSelect";
import TableToolbar from "../components/TableToolbar";

import {
    compareDate,
    compareText,
    sortByOption
} from "../utils/sortUtils";

import {
    getCategories,
    createCategory,
    updateCategory,
    disableCategory,
    enableCategory
} from "../services/categoryService";
import {
    getApiErrorMessage
} from "../utils/getApiErrorMessage";
import {
    useAuth
} from "../hooks/useAuth";


import ConfirmDialog from "../components/ConfirmDialog";

import AlertMessage from "../components/AlertMessage";

import PageHeader from "../components/PageHeader";

import SearchInput from "../components/SearchInput";

import ShowInactiveCheckbox from "../components/ShowInactiveCheckbox";

function Categories() {

    const {
    hasPermission
} = useAuth();

const canWriteCategory =
    hasPermission("CATEGORY_WRITE");

const canChangeCategoryStatus =
    hasPermission("CATEGORY_STATUS_CHANGE");

    const showCategoryActions =
    canWriteCategory || canChangeCategoryStatus;

    const [sortOption, setSortOption] =
    useState("nameAsc");

    const [statusOrder, setStatusOrder] =
    useState("default");
    
    const [categories, setCategories] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [showInactive, setShowInactive] =
        useState(true);

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [errorMessage, setErrorMessage] =
        useState("");

    const [confirmDialog, setConfirmDialog] =
        useState({
            isOpen: false,
            title: "",
            message: "",
            confirmText: "Confirmar",
            variant: "danger",
            onConfirm: null
        });


        const categorySortOptions = [
    {
        value: "nameAsc",
        label: "Nombre A-Z"
    },
    {
        value: "nameDesc",
        label: "Nombre Z-A"
    },
    {
        value: "recent",
        label: "Más recientes"
    },
    {
        value: "oldest",
        label: "Más antiguos"
    }
];

const statusOrderOptions = [
    {
        value: "default",
        label: "Estado sin prioridad"
    },
    {
        value: "activeFirst",
        label: "Activas primero"
    },
    {
        value: "inactiveFirst",
        label: "Inactivas primero"
    }
];

    const loadCategories = async () => {

    try {

        const data =
            await getCategories();

        setCategories(data);

    } catch (error) {

        console.error(error);

        setErrorMessage(
            "Error al cargar categorías"
        );
    }
};

useEffect(() => {

    let cancelled = false;

    getCategories()
        .then((data) => {

            if (!cancelled) {
                setCategories(data);
            }
        })
        .catch((error) => {

            console.error(error);

            if (!cancelled) {
                setErrorMessage(
                    "Error al cargar categorías"
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
    };

    const clearForm = () => {

        resetForm();
        clearMessages();
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

    const validateForm = () => {

        if (!name.trim()) {

            setErrorMessage(
                "El nombre de la categoría es obligatorio"
            );

            return false;
        }

        return true;
    };

    const handleSaveCategory = async () => {

        clearMessages();

        if (!validateForm()) {
            return;
        }

        try {

            setLoading(true);

            const payload = {
                name: name.trim(),
                description: description.trim()
            };

            if (editingId) {

                await updateCategory(
                    editingId,
                    payload
                );

                setMessage(
                    "Categoría actualizada correctamente"
                );

            } else {

                await createCategory(
                    payload
                );

                setMessage(
                    "Categoría creada correctamente"
                );
            }

            await loadCategories();

            resetForm();

        } catch (error) {

            console.error(error);

            setErrorMessage(
                getErrorMessage(
                    error,
                    "Error al guardar categoría"
                )
            );

        } finally {

            setLoading(false);
        }
    };

    const handleEditCategory = (category) => {

        clearMessages();

        if (!category.active) {

            setErrorMessage(
                "No puedes editar una categoría inactiva. Primero debes reactivarla."
            );

            return;
        }

        setEditingId(category.id);
        setName(category.name);
        setDescription(category.description || "");
    };

    const handleDisableCategory = (id) => {

        clearMessages();

        setConfirmDialog({
            isOpen: true,
            title: "Desactivar categoría",
            message: "¿Seguro que deseas desactivar esta categoría?",
            confirmText: "Desactivar",
            variant: "danger",
            onConfirm: async () => {

                try {

                    setLoading(true);

                    await disableCategory(id);

                    await loadCategories();

                    setMessage(
                        "Categoría desactivada correctamente"
                    );

                    if (editingId === id) {
                        resetForm();
                    }

                } catch (error) {

                    console.error(error);

                    setErrorMessage(
                        getErrorMessage(
                            error,
                            "Error al desactivar categoría"
                        )
                    );

                } finally {

                    setLoading(false);
                }
            }
        });
    };

    const handleEnableCategory = (id) => {

        clearMessages();

        setConfirmDialog({
            isOpen: true,
            title: "Reactivar categoría",
            message: "¿Seguro que deseas reactivar esta categoría?",
            confirmText: "Reactivar",
            variant: "success",
            onConfirm: async () => {

                try {

                    setLoading(true);

                    await enableCategory(id);

                    await loadCategories();

                    setMessage(
                        "Categoría reactivada correctamente"
                    );

                } catch (error) {

                    console.error(error);

                    setErrorMessage(
                        getErrorMessage(
                            error,
                            "Error al reactivar categoría"
                        )
                    );

                } finally {

                    setLoading(false);
                }
            }
        });
    };


    const filteredCategories =
        categories.filter(category => {

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                category.name
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                category.description
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesStatus =
                showInactive || category.active;

            return matchesSearch && matchesStatus;
        });

        const categorySorters = {
    nameAsc: (first, second) =>
        compareText(first.name, second.name),

    nameDesc: (first, second) =>
        compareText(second.name, first.name),

    recent: (first, second) =>
        compareDate(second.createdAt, first.createdAt),

    oldest: (first, second) =>
        compareDate(first.createdAt, second.createdAt)
};

const sortedCategories = (() => {

    const sortedBySelectedOption =
        sortByOption(
            filteredCategories,
            sortOption,
            categorySorters
        );

    if (statusOrder === "activeFirst") {
        return [...sortedBySelectedOption].sort(
            (first, second) =>
                Number(second.active) - Number(first.active)
        );
    }

    if (statusOrder === "inactiveFirst") {
        return [...sortedBySelectedOption].sort(
            (first, second) =>
                Number(first.active) - Number(second.active)
        );
    }

    return sortedBySelectedOption;
})();

    return (

        <div>

            <PageHeader
                title="Categorías"
                subtitle="Administra las categorías de productos"
            />

            <AlertMessage
    type="success"
    message={message}
/>

<AlertMessage
    type="error"
    message={errorMessage}
/>

            <CategoryForm
    canWriteCategory={canWriteCategory}
    editingId={editingId}
    name={name}
    setName={setName}
    description={description}
    setDescription={setDescription}
    loading={loading}
    handleSaveCategory={handleSaveCategory}
    clearForm={clearForm}
/>

            <TableToolbar>

    <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Buscar categoría..."
    />

    <ShowInactiveCheckbox
        checked={showInactive}
        onChange={setShowInactive}
    />

    <FilterSelect
        label="Ordenar por"
        value={sortOption}
        onChange={setSortOption}
        options={categorySortOptions}
    />

    <FilterSelect
        label="Prioridad de estado"
        value={statusOrder}
        onChange={setStatusOrder}
        options={statusOrderOptions}
    />

</TableToolbar>

            <br />
            <br />

            <CategoryTable
    categories={sortedCategories}
    loading={loading}
    showCategoryActions={showCategoryActions}
    canWriteCategory={canWriteCategory}
    canChangeCategoryStatus={canChangeCategoryStatus}
    handleEditCategory={handleEditCategory}
    handleDisableCategory={handleDisableCategory}
    handleEnableCategory={handleEnableCategory}
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

export default Categories;