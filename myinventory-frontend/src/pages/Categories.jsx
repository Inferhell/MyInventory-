import { useEffect, useState } from "react";

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

import ActionButton from "../components/ActionButton";

import ConfirmDialog from "../components/ConfirmDialog";

import StatusBadge from "../components/StatusBadge";

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

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString();
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

            {
                canWriteCategory && (
                    <>
                        <h2>
                            {
                                editingId
                                    ? "Editar Categoría"
                                    : "Nueva Categoría"
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

                      <ActionButton
                         variant="primary"
                         onClick={handleSaveCategory}
                         disabled={loading}
                        >
                            {
                                editingId
                                    ? "Actualizar Categoría"
                                    : "Crear Categoría"
                            }
                        </ActionButton>

                        {
                            editingId && (
                                <ActionButton
    variant="secondary"
    onClick={clearForm}
    disabled={loading}
>
    Cancelar
</ActionButton>
                            )
                        }

                        <hr />
                    </>
                )
            }

            <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Buscar categoría..."
            />

            <br />
            <br />

            <ShowInactiveCheckbox
                checked={showInactive}
                onChange={setShowInactive}
            />

            <br />
            <br />

            <table border="1">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Activo</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
   {
                            showCategoryActions && (
                                <th>Acciones</th>
                            )
                        }
                    </tr>

                </thead>

                <tbody>

                    {
                        filteredCategories.length === 0 ? (

                            <tr>
                                <td colSpan={showCategoryActions ? 7 : 6}>
                                    No hay categorías para mostrar
                                </td>
                            </tr>

                        ) : (

                            filteredCategories.map(category => (

                                <tr key={category.id}>

                                    <td>
                                        {category.id}
                                    </td>

                                    <td>
                                        {category.name}
                                    </td>

                                    <td>
                                        {category.description || "-"}
                                    </td>

                                    <td>
                                        <StatusBadge active={category.active} />
                                    </td>

                                    <td>
                                        {
                                            formatDate(
                                                category.createdAt
                                            )
                                        }
                                    </td>

                                    <td>
                                        {
                                            formatDate(
                                                category.updatedAt
                                            )
                                        }
                                    </td>

                                    {
                                        showCategoryActions && (

                                            <td>
                                        {
    canWriteCategory && category.active ? (

                        <ActionButton
                                variant="primary"
                                onClick={() =>
                                    handleEditCategory(category)
                                }
                                disabled={loading}
                            >
                                Editar
                            </ActionButton>

    ) : !category.active && canWriteCategory ? (

        <span>
            Reactivar para editar
        </span>

    ) : null
}

                                        {
    canChangeCategoryStatus && (

        category.active ? (
                    <ActionButton
                        variant="danger"
                        onClick={() =>
                            handleDisableCategory(category.id)
                        }
                        disabled={loading}
                    >
                        Desactivar
                    </ActionButton>

        ) : (

            <ActionButton
                variant="success"
                onClick={() =>
                    handleEnableCategory(category.id)
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