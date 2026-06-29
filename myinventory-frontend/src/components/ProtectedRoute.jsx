import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children }) {

    const {
        loading,
        isAuthenticated
    } = useAuth();

    if (loading) {

        return (
            <p>
                Verificando sesión...
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

    return children;
}

export default ProtectedRoute;