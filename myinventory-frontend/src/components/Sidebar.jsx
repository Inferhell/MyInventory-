import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function Sidebar() {

    const {
        hasPermission
    } = useAuth();

    return (
          <aside className="sidebar">
        

            <nav>

                {
                    hasPermission("DASHBOARD_READ") && (
                        <>
                            <Link to="/dashboard">
                                Dashboard
                            </Link>
                            <br />
                        </>
                    )
                }

                {
                    hasPermission("PRODUCT_READ") && (
                        <>
                            <Link to="/products">
                                Productos
                            </Link>
                            <br />
                        </>
                    )
                }

                {
                    hasPermission("CATEGORY_READ") && (
                        <>
                            <Link to="/categories">
                                Categorías
                            </Link>
                            <br />
                        </>
                    )
                }

                {
                    hasPermission("SUPPLIER_READ") && (
                        <>
                            <Link to="/suppliers">
                                Proveedores
                            </Link>
                            <br />
                        </>
                    )
                }

                {
                    hasPermission("MOVEMENT_READ") && (
                        <>
                            <Link to="/movements">
                                Movimientos
                            </Link>
                            <br />
                        </>
                    )
                }

                {
                    hasPermission("USER_READ") && (
                        <>
                            <Link to="/users">
                                Usuarios
                            </Link>
                            <br />
                        </>
                    )
                }

            </nav>

        </aside>
    );
}

export default Sidebar;