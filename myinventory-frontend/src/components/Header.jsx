import { useEffect, useState } from "react";
import { logout, getCurrentUser } from "../services/authService";
import { useNavigate } from "react-router-dom";



function Header() {

    const navigate = useNavigate();

    const [user, setUser] =
        useState(null);

    useEffect(() => {

        loadUser();

    }, []);

    const loadUser = async () => {

        try {

            const data =
                await getCurrentUser();

            setUser(data);

        } catch (error) {

            console.error(error);
        }
    };

    const handleLogout = async () => {

        try {

            await logout();

            localStorage.clear();

            navigate("/login");

        } catch (error) {

            console.error(error);
        }
    };

    return (

    <div>

        <span>
            {user?.email}
        </span>

        {" | "}

        <span>
            {
                user?.authorities?.find(
                    auth =>
                        auth.authority.startsWith(
                            "ROLE_"
                        )
                )?.authority
            }
        </span>

        {" "}

        <button
            onClick={handleLogout}
        >
            Cerrar Sesión
        </button>

    </div>
);  

}

export default Header;