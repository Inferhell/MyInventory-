import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PermissionRoute({
    permission,
    anyOf = [],
    children
}) {

    const {
        loading,
        isAuthenticated,
        hasPermission,
        hasAnyPermission
    } = useAuth();

    if (loading) {

        return (
            <p>
                Verificando permisos...
            </p>
        );
    }

    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    const allowed =
        permission
            ? hasPermission(permission)
            : hasAnyPermission(anyOf);

    if (!allowed) {

        return (
            <Navigate
                to="/forbidden"
                replace
            />
        );
    }

    return children;
}

export default PermissionRoute;