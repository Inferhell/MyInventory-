import { useEffect, useState } from "react";
import { logout, getCurrentUser } from "../services/authService";
import { useNavigate } from "react-router-dom";



function Header() {

    const navigate = useNavigate();

    const [user, setUser] =
        useState(null);

    

    useEffect(() => {

    let cancelled = false;

    getCurrentUser()
        .then((data) => {

            if (!cancelled) {
                setUser(data);
            }
        })
        .catch((error) => {
            console.error(error);
        });

    return () => {
        cancelled = true;
    };

}, []);

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