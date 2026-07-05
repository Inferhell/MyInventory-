import { useEffect, useState } from "react";

import {
    getSuppliers,
    createSupplier,
    updateSupplier,
    disableSupplier,
    enableSupplier
} from "../services/supplierService";
import {
    getApiErrorMessage
} from "../utils/getApiErrorMessage";

import AlertMessage from "../components/AlertMessage";

import {
    useAuth
} from "../hooks/useAuth";

function Suppliers() {

    const {
    hasPermission
} = useAuth();

const canWriteSupplier =
    hasPermission("SUPPLIER_WRITE");

const canChangeSupplierStatus =
    hasPermission("SUPPLIER_STATUS_CHANGE");

    const showSupplierActions =
    canWriteSupplier || canChangeSupplierStatus;

    const [suppliers, setSuppliers] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const [search, setSearch] = useState("");
    const [showInactive, setShowInactive] = useState(true);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

   useEffect(() => {

    let cancelled = false;

    getSuppliers()
        .then((data) => {

            if (!cancelled) {
                setSuppliers(data);
            }
        })
        .catch((error) => {

            console.error(error);

            if (!cancelled) {
                setErrorMessage(
                    "Error al cargar proveedores"
                );
            }
        });

    return () => {
        cancelled = true;
    };

}, []);

        

    const loadSuppliers = async () => {

        try {

            const data =
                await getSuppliers();

            setSuppliers(data);

        } catch (error) {

            console.error(error);

            setErrorMessage(
                "Error al cargar proveedores"
            );
        }
    };


    const clearMessages = () => {

        setMessage("");
        setErrorMessage("");
    };

    const resetForm = () => {

        setEditingId(null);
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
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
                "El nombre del proveedor es obligatorio"
            );

            return false;
        }

        if (!phone.trim()) {

            setErrorMessage(
                "El teléfono del proveedor es obligatorio"
            );

            return false;
        }

        if (!email.trim()) {

            setErrorMessage(
                "El correo del proveedor es obligatorio"
            );

            return false;
        }

        if (!email.includes("@")) {

            setErrorMessage(
                "El correo no tiene un formato válido"
            );

            return false;
        }

        if (!address.trim()) {

            setErrorMessage(
                "La dirección del proveedor es obligatoria"
            );

            return false;
        }

        return true;
    };

    const handleSaveSupplier = async () => {

        clearMessages();

        if (!validateForm()) {
            return;
        }

        try {

            setLoading(true);

            const payload = {
                name: name.trim(),
                phone: phone.trim(),
                email: email.trim(),
                address: address.trim()
            };

            if (editingId) {

                await updateSupplier(
                    editingId,
                    payload
                );

                setMessage(
                    "Proveedor actualizado correctamente"
                );

            } else {

                await createSupplier(
                    payload
                );

                setMessage(
                    "Proveedor creado correctamente"
                );
            }

            await loadSuppliers();

            resetForm();

        } catch (error) {

            console.error(error);

            setErrorMessage(
                getErrorMessage(
                    error,
                    "Error al guardar proveedor"
                )
            );

        } finally {

            setLoading(false);
        }
    };

    const handleEditSupplier = (supplier) => {

        clearMessages();

        if (!supplier.active) {

            setErrorMessage(
                "No puedes editar un proveedor inactivo. Primero debes reactivarlo."
            );

            return;
        }

        setEditingId(supplier.id);
        setName(supplier.name);
        setPhone(supplier.phone || "");
        setEmail(supplier.email || "");
        setAddress(supplier.address || "");
    };

    const handleDisableSupplier = async (id) => {

        clearMessages();

        const confirmDisable =
            window.confirm(
                "¿Seguro que deseas desactivar este proveedor?"
            );

        if (!confirmDisable) {
            return;
        }

        try {

            setLoading(true);

            await disableSupplier(id);

            await loadSuppliers();

            setMessage(
                "Proveedor desactivado correctamente"
            );

            if (editingId === id) {
                resetForm();
            }

        } catch (error) {

            console.error(error);

            setErrorMessage(
                getErrorMessage(
                    error,
                    "Error al desactivar proveedor"
                )
            );

        } finally {

            setLoading(false);
        }
    };

    const handleEnableSupplier = async (id) => {

        clearMessages();

        try {

            setLoading(true);

            await enableSupplier(id);

            await loadSuppliers();

            setMessage(
                "Proveedor reactivado correctamente"
            );

        } catch (error) {

            console.error(error);

            setErrorMessage(
                getErrorMessage(
                    error,
                    "Error al reactivar proveedor"
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

    const filteredSuppliers =
        suppliers.filter(supplier => {

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                supplier.name
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                supplier.phone
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                supplier.email
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                supplier.address
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesStatus =
                showInactive || supplier.active;

            return matchesSearch && matchesStatus;
        });

    return (

        <div>

            <h1>
                Proveedores
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
                canWriteSupplier && (
                    <>
                        <h2>
                            {
                                editingId
                                    ? "Editar Proveedor"
                                    : "Nuevo Proveedor"
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
                            placeholder="Teléfono"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                        />

                        <br />
                        <br />

                        <input
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <br />
                        <br />

                        <input
                            type="text"
                            placeholder="Dirección"
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                        />

                        <br />
                        <br />

                        <button
                            onClick={handleSaveSupplier}
                            disabled={loading}
                        >
                            {
                                editingId
                                    ? "Actualizar Proveedor"
                                    : "Crear Proveedor"
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
                placeholder="Buscar proveedor..."
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
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Dirección</th>
                        <th>Activo</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
    {
                            showSupplierActions && (
                                <th>Acciones</th>
                            )
                        }
                    </tr>

                </thead>

                <tbody>

                    {
                        filteredSuppliers.length === 0 ? (

                            <tr>
                                <td colSpan={showSupplierActions ? 9 : 8}>
                                    No hay proveedores para mostrar
                                </td>
                            </tr>

                        ) : (

                            filteredSuppliers.map(supplier => (

                                <tr key={supplier.id}>

                                    <td>
                                        {supplier.id}
                                    </td>

                                    <td>
                                        {supplier.name}
                                    </td>

                                    <td>
                                        {supplier.phone}
                                    </td>

                                    <td>
                                        {supplier.email}
                                    </td>

                                    <td>
                                        {supplier.address}
                                    </td>

                                    <td>
                                        {
                                            supplier.active
                                                ? "Sí"
                                                : "No"
                                        }
                                    </td>

                                    <td>
                                        {
                                            formatDate(
                                                supplier.createdAt
                                            )
                                        }
                                    </td>

                                    <td>
                                        {
                                            formatDate(
                                                supplier.updatedAt
                                            )
                                        }
                                    </td>

                                    {
                                        showSupplierActions && (

                                            <td>
                                        {
    canWriteSupplier && supplier.active ? (

        <button
            onClick={() =>
                handleEditSupplier(supplier)
            }
            disabled={loading}
        >
            Editar
        </button>

    ) : !supplier.active && canWriteSupplier ? (

        <span>
            Reactivar para editar
        </span>

    ) : null
}

                                        {
    canChangeSupplierStatus && (

        supplier.active ? (

            <button
                onClick={() =>
                    handleDisableSupplier(supplier.id)
                }
                disabled={loading}
            >
                Desactivar
            </button>

        ) : (

            <button
                onClick={() =>
                    handleEnableSupplier(supplier.id)
                }
                disabled={loading}
            >
                Reactivar
            </button>
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

        </div>
    );
}

export default Suppliers;