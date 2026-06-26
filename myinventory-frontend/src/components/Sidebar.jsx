import { Link } from "react-router-dom";

function Sidebar() {
const user = JSON.parse(
    localStorage.getItem("user")
);

const role =
    user?.authorities?.find(
        auth =>
            auth.authority.startsWith(
                "ROLE_"
            )
    )?.authority;
    
    return (
        <div>
            <h2>MyInventory</h2>

            <ul>

    <li>
        <Link to="/">
            Dashboard
        </Link>
    </li>

    <li>
        <Link to="/products">
            Productos
        </Link>
    </li>

    {
    (
        role === "ROLE_ADMIN" ||
        role === "ROLE_SUPERVISOR"
    ) && (

        <li>
            <Link to="/categories">
                Categorías
            </Link>
        </li>

    )
}

    {
        (
            role === "ROLE_ADMIN" ||
            role === "ROLE_SUPERVISOR"
        ) && (

            <li>
                <Link to="/suppliers">
                    Proveedores
                </Link>
            </li>

        )
    }

    <li>
        <Link to="/movements">
            Movimientos
        </Link>
    </li>

    {
        role === "ROLE_ADMIN" && (

            <li>
                <Link to="/users">
                    Usuarios
                </Link>
            </li>

        )
    }

</ul>
        </div>
    );
}

export default Sidebar;