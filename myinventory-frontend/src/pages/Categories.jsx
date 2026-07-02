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

function Categories() {

    const {
    hasPermission
} = useAuth();

const canWriteCategory =
    hasPermission("CATEGORY_WRITE");

const canChangeCategoryStatus =
    hasPermission("CATEGORY_STATUS_CHANGE");

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

    const handleDisableCategory = async (id) => {

        clearMessages();

        const confirmDisable =
            window.confirm(
                "¿Seguro que deseas desactivar esta categoría?"
            );

        if (!confirmDisable) {
            return;
        }

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
    };

    const handleEnableCategory = async (id) => {

        clearMessages();

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

            <h1>
                Categorías
            </h1>

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

                        <button
                            onClick={handleSaveCategory}
                            disabled={loading}
                        >
                            {
                                editingId
                                    ? "Actualizar Categoría"
                                    : "Crear Categoría"
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
                placeholder="Buscar categoría..."
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
                        setShowInactive(
                            !showInactive
                        )
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
                        <th>Descripción</th>
                        <th>Activo</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
                        <th>Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        filteredCategories.length === 0 ? (

                            <tr>
                                <td colSpan="7">
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
                                        {
                                            category.active
                                                ? "Sí"
                                                : "No"
                                        }
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

                                    <td>

                                        {
    canWriteCategory && category.active ? (

        <button
            onClick={() =>
                handleEditCategory(category)
            }
            disabled={loading}
        >
            Editar
        </button>

    ) : !category.active && canWriteCategory ? (

        <span>
            Reactivar para editar
        </span>

    ) : null
}

                                        {
    canChangeCategoryStatus && (

        category.active ? (

            <button
                onClick={() =>
                    handleDisableCategory(category.id)
                }
                disabled={loading}
            >
                Desactivar
            </button>

        ) : (

            <button
                onClick={() =>
                    handleEnableCategory(category.id)
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

export default Categories;