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

import SupplierForm from "../components/SupplierForm";
import SupplierTable from "../components/SupplierTable";


import ConfirmDialog from "../components/ConfirmDialog";

import AlertMessage from "../components/AlertMessage";

import {
    useAuth
} from "../hooks/useAuth";

import PageHeader from "../components/PageHeader";

import SearchInput from "../components/SearchInput";

import ShowInactiveCheckbox from "../components/ShowInactiveCheckbox";

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

    const [confirmDialog, setConfirmDialog] =
        useState({
            isOpen: false,
            title: "",
            message: "",
            confirmText: "Confirmar",
            variant: "danger",
            onConfirm: null
        });


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

    const handleDisableSupplier = (id) => {

        clearMessages();

        setConfirmDialog({
            isOpen: true,
            title: "Desactivar proveedor",
            message: "¿Seguro que deseas desactivar este proveedor?",
            confirmText: "Desactivar",
            variant: "danger",
            onConfirm: async () => {

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
            }
        });
    };

    const handleEnableSupplier = (id) => {

        clearMessages();

        setConfirmDialog({
            isOpen: true,
            title: "Reactivar proveedor",
            message: "¿Seguro que deseas reactivar este proveedor?",
            confirmText: "Reactivar",
            variant: "success",
            onConfirm: async () => {

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
            }
        });
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

            <PageHeader
                title="Proveedores"
                subtitle="Administra los proveedores del inventario"
            />

          <AlertMessage
    type="success"
    message={message}
/>

<AlertMessage
    type="error"
    message={errorMessage}
/>

          <SupplierForm
    canWriteSupplier={canWriteSupplier}
    editingId={editingId}
    name={name}
    setName={setName}
    email={email}
    setEmail={setEmail}
    phone={phone}
    setPhone={setPhone}
    address={address}
    setAddress={setAddress}
    loading={loading}
    handleSaveSupplier={handleSaveSupplier}
    clearForm={clearForm}
/>

            <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Buscar proveedor..."
            />

            <br />
            <br />

            <ShowInactiveCheckbox
                checked={showInactive}
                onChange={setShowInactive}
            />

            <br />
            <br />

           <SupplierTable
    suppliers={filteredSuppliers}
    loading={loading}
    showSupplierActions={showSupplierActions}
    canWriteSupplier={canWriteSupplier}
    canChangeSupplierStatus={canChangeSupplierStatus}
    handleEditSupplier={handleEditSupplier}
    handleDisableSupplier={handleDisableSupplier}
    handleEnableSupplier={handleEnableSupplier}
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

export default Suppliers;