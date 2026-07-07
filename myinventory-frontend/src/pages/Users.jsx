import { useEffect, useState } from "react";

import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

import {
    getUsers,
    createUser,
    updateUser,
    disableUser,
    enableUser
} from "../services/userService";
import {
    getApiErrorMessage
} from "../utils/getApiErrorMessage";

import AlertMessage from "../components/AlertMessage";



import ConfirmDialog from "../components/ConfirmDialog";

import {
    useAuth
} from "../hooks/useAuth";

import PageHeader from "../components/PageHeader";

import SearchInput from "../components/SearchInput";

import ShowInactiveCheckbox from "../components/ShowInactiveCheckbox";

function Users() {

    const {
    hasPermission,
    user: currentUser
} = useAuth();

const canCreateUser =
    hasPermission("USER_CREATE");

const canEditUser =
    hasPermission("USER_EDIT");

const canChangeUserStatus =
    hasPermission("USER_STATUS_CHANGE");

    const showUserActions =
    canEditUser || canChangeUserStatus;

    const [users, setUsers] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("EMPLOYEE");

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


   
   const loadUsers = async () => {

        try {

            const data = await getUsers();

            setUsers(data);

        } catch (error) {

            console.error(error);

            setErrorMessage(
                "Error al cargar usuarios"
            );
        }
    };

    useEffect(() => {

    let cancelled = false;

    getUsers()
        .then((data) => {

            if (!cancelled) {
                setUsers(data);
            }
        })
        .catch((error) => {

            console.error(error);

            if (!cancelled) {
                setErrorMessage(
                    "Error al cargar usuarios"
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
        setEmail("");
        setPassword("");
        setRole("EMPLOYEE");
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
                "El nombre del usuario es obligatorio"
            );

            return false;
        }

        if (!email.trim()) {

            setErrorMessage(
                "El correo del usuario es obligatorio"
            );

            return false;
        }

        if (!email.includes("@")) {

            setErrorMessage(
                "El correo no tiene un formato válido"
            );

            return false;
        }

        if (!editingId && !password.trim()) {

            setErrorMessage(
                "La contraseña es obligatoria"
            );

            return false;
        }

        if (!editingId && password.length < 8) {

            setErrorMessage(
                "La contraseña debe tener al menos 8 caracteres"
            );

            return false;
        }

        if (!role) {

            setErrorMessage(
                "Debes seleccionar un rol"
            );

            return false;
        }

        return true;
    };

    const handleSaveUser = async () => {

        clearMessages();

        if (!validateForm()) {
            return;
        }

        try {

            setLoading(true);

            if (editingId) {

                const payload = {
                    name: name.trim(),
                    email: email.trim(),
                    role
                };

                await updateUser(
                    editingId,
                    payload
                );

                setMessage(
                    "Usuario actualizado correctamente"
                );

            } else {

                const payload = {
                    name: name.trim(),
                    email: email.trim(),
                    password,
                    role
                };

                await createUser(
                    payload
                );

                setMessage(
                    "Usuario creado correctamente"
                );
            }

            await loadUsers();

            resetForm();

        } catch (error) {

            console.error(error);

            setErrorMessage(
                getErrorMessage(
                    error,
                    "Error al guardar usuario"
                )
            );

        } finally {

            setLoading(false);
        }
    };

    const handleEditUser = (user) => {

        clearMessages();

        if (!user.active) {

            setErrorMessage(
                "No puedes editar un usuario inactivo. Primero debes reactivarlo."
            );

            return;
        }

        setEditingId(user.id);
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        setPassword("");
    };

    const handleDisableUser = (id) => {

        clearMessages();

        setConfirmDialog({
            isOpen: true,
            title: "Desactivar usuario",
            message: "¿Seguro que deseas desactivar este usuario?",
            confirmText: "Desactivar",
            variant: "danger",
            onConfirm: async () => {

                try {

                    setLoading(true);

                    await disableUser(id);

                    await loadUsers();

                    setMessage(
                        "Usuario desactivado correctamente"
                    );

                    if (editingId === id) {
                        resetForm();
                    }

                } catch (error) {

                    console.error(error);

                    setErrorMessage(
                        getErrorMessage(
                            error,
                            "Error al desactivar usuario"
                        )
                    );

                } finally {

                    setLoading(false);
                }
            }
        });
    };

    const handleEnableUser = (id) => {

        clearMessages();

        setConfirmDialog({
            isOpen: true,
            title: "Reactivar usuario",
            message: "¿Seguro que deseas reactivar este usuario?",
            confirmText: "Reactivar",
            variant: "success",
            onConfirm: async () => {

                try {

                    setLoading(true);

                    await enableUser(id);

                    await loadUsers();

                    setMessage(
                        "Usuario reactivado correctamente"
                    );

                } catch (error) {

                    console.error(error);

                    setErrorMessage(
                        getErrorMessage(
                            error,
                            "Error al reactivar usuario"
                        )
                    );

                } finally {

                    setLoading(false);
                }
            }
        });
    };

    const filteredUsers =
        users.filter(user => {

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                user.name
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                user.email
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                user.role
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesStatus =
                showInactive || user.active;

            return matchesSearch && matchesStatus;
        });

    return (

        <div>

            <PageHeader
                title="Usuarios"
                subtitle="Administra usuarios, roles y estado de acceso"
            />

            <AlertMessage
    type="success"
    message={message}
/>

<AlertMessage
    type="error"
    message={errorMessage}
/>

            <UserForm
    canCreateUser={canCreateUser}
    canEditUser={canEditUser}
    editingId={editingId}
    name={name}
    setName={setName}
    email={email}
    setEmail={setEmail}
    password={password}
    setPassword={setPassword}
    role={role}
    setRole={setRole}
    loading={loading}
    handleSaveUser={handleSaveUser}
    clearForm={clearForm}
/>

            <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Buscar usuario..."
            />

            <br />
            <br />

            <ShowInactiveCheckbox
                checked={showInactive}
                onChange={setShowInactive}
            />

            <br />
            <br />

            <UserTable
    users={filteredUsers}
    loading={loading}
    currentUser={currentUser}
    showUserActions={showUserActions}
    canEditUser={canEditUser}
    canChangeUserStatus={canChangeUserStatus}
    handleEditUser={handleEditUser}
    handleDisableUser={handleDisableUser}
    handleEnableUser={handleEnableUser}
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

export default Users;