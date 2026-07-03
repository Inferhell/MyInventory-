import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import {
    getCurrentUser,
    loginRequest,
    logoutRequest
} from "../services/authService";

import {
    AuthContext
} from "./AuthContextBase";

export function AuthProvider({ children }) {

    const [user, setUser] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const login = useCallback(
        async (credentials) => {

            await loginRequest(credentials);

            const currentUser =
                await getCurrentUser();

            setUser(currentUser);

            localStorage.setItem(
                "user",
                JSON.stringify(currentUser)
            );

            return currentUser;
        },
        []
    );

    const logout = useCallback(
        async () => {

            try {

                await logoutRequest();

            } finally {

                setUser(null);

                localStorage.removeItem(
                    "user"
                );
            }
        },
        []
    );

    const hasRole = useCallback(
        (role) => {

            return user?.role === role;
        },
        [user]
    );

    const hasPermission = useCallback(
        (permission) => {

            return user?.permissions
                ?.includes(permission) ?? false;
        },
        [user]
    );

    const hasAnyPermission = useCallback(
        (permissions) => {

            return permissions.some(
                permission =>
                    hasPermission(permission)
            );
        },
        [hasPermission]
    );

    useEffect(() => {

        let cancelled = false;

        getCurrentUser()
            .then((data) => {

                if (!cancelled) {

                    setUser(data);

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data)
                    );
                }
            })
            .catch(() => {

                if (!cancelled) {

                    setUser(null);

                    localStorage.removeItem(
                        "user"
                    );
                }
            })
            .finally(() => {

                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };

    }, []);

    const value = useMemo(
        () => {

            return {
                user,
                loading,
                login,
                logout,
                hasRole,
                hasPermission,
                hasAnyPermission,
                isAuthenticated: Boolean(user)
            };
        },
        [
            user,
            loading,
            login,
            logout,
            hasRole,
            hasPermission,
            hasAnyPermission
        ]
    );

    return (

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}