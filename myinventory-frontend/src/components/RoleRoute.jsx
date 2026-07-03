import { Navigate } from "react-router-dom";

function RoleRoute({ children, roles = [] }) {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    const userRole =
        user.authorities?.find(
            auth =>
                auth.authority.startsWith("ROLE_")
        )?.authority;

    if (!roles.includes(userRole)) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return children;
}

export default RoleRoute;