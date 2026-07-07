import { useNavigate } from "react-router-dom";

import {
    useAuth
} from "../hooks/useAuth";

import ActionButton from "../components/ActionButton";

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

        <header className="header">

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

                    <ActionButton
                        variant="secondary"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </ActionButton>

                    </div>
                )
            }

        </header>
    );
}

export default Header;