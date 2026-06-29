import { useNavigate } from "react-router-dom";

import {
    useAuth
} from "../hooks/useAuth";

function Header() {

    const navigate =
        useNavigate();

    const {
        user,
        logout
    } = useAuth();

    const handleLogout = async () => {

        await logout();

        navigate("/login");
    };

    return (

        <header>

            <h2>
                MyInventory
            </h2>

            {
                user && (

                    <div>

                        <span>
                            {user.email}
                            {" "}
                            |
                            {" "}
                            {user.role}
                        </span>

                        {" "}

                        <button
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </button>

                    </div>
                )
            }

        </header>
    );
}

export default Header;