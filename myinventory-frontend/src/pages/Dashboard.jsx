import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import PageHeader from "../components/PageHeader";
import AlertMessage from "../components/AlertMessage";
import DashboardKpiCard from "../components/DashboardKpiCard";
import DashboardKpiGrid from "../components/DashboardKpiGrid";


function Dashboard() {

    const [dashboard, setDashboard] =
        useState(null);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const data =
                    await getDashboard();

                console.log(data);

                setDashboard(data);

            } catch (error) {

                console.error(error);

                setError(
                    "Error al cargar el dashboard"
                );
            }
        };

        loadDashboard();

    }, []);

    if (!dashboard) {

        return <p>Cargando dashboard...</p>;
    }

   return (
    <div>

        <PageHeader
            title="Dashboard"
            subtitle="Resumen general del inventario"
        />

        <AlertMessage
            type="error"
            message={error}
        />

        {
            dashboard ? (

                <p>
                    Cargando dashboard...
                </p>

            ) : (

                <DashboardKpiGrid>

                    <DashboardKpiCard
                        title="Productos"
                        value={dashboard?.totalProducts}
                        description="Productos registrados"
                        variant="products"
                    />

                    <DashboardKpiCard
                        title="Categorías"
                        value={dashboard?.totalCategories}
                        description="Categorías registradas"
                        variant="categories"
                    />

                    <DashboardKpiCard
                        title="Proveedores"
                        value={dashboard?.totalSuppliers}
                        description="Proveedores registrados"
                        variant="suppliers"
                    />

                    <DashboardKpiCard
                        title="Movimientos"
                        value={dashboard?.totalMovements}
                        description="Movimientos registrados"
                        variant="movements"
                    />

                    <DashboardKpiCard
                        title="Entradas"
                        value={dashboard?.totalEntries}
                        description="Movimientos de entrada"
                        variant="entries"
                    />

                    <DashboardKpiCard
                        title="Salidas"
                        value={dashboard?.totalExits}
                        description="Movimientos de salida"
                        variant="exits"
                    />

                    <DashboardKpiCard
                        title="Stock total"
                        value={dashboard?.totalStock}
                        description="Unidades en inventario"
                        variant="stock"
                    />

                </DashboardKpiGrid>
            )
        }

    </div>
);
}

export default Dashboard;