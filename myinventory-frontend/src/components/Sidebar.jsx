import { NavLink } from "react-router-dom";

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
                            <NavLink to="/dashboard">
                                Dashboard
                            </NavLink>
                            <br />
                        </>
                    )
                }

                {
                    hasPermission("PRODUCT_READ") && (
                        <>
                            <NavLink to="/products">
                                Productos
                            </NavLink>
                            <br />
                        </>
                    )
                }

                {
                    hasPermission("CATEGORY_READ") && (
                        <>
                            <NavLink to="/categories">
                                Categorías
                            </NavLink>
                            <br />
                        </>
                    )
                }

                {
                    hasPermission("SUPPLIER_READ") && (
                        <>
                            <NavLink to="/suppliers">
                                Proveedores
                            </NavLink>
                            <br />
                        </>
                    )
                }

                {
                    hasPermission("MOVEMENT_READ") && (
                        <>
                            <NavLink to="/movements">
                                Movimientos
                            </NavLink>
                            <br />
                        </>
                    )
                }

                {
                    hasPermission("USER_READ") && (
                        <>
                            <NavLink to="/users">
                                Usuarios
                            </NavLink>
                            <br />
                        </>
                    )
                }

            </nav>

        </aside>
    );
}

export default Sidebar;