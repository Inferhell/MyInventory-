import {
    useEffect,
    useState
} from "react";

import {
    getDashboard
} from "../services/dashboardService";

import PageHeader from "../components/PageHeader";
import AlertMessage from "../components/AlertMessage";
import DashboardKpiCard from "../components/DashboardKpiCard";
import DashboardKpiGrid from "../components/DashboardKpiGrid";
import DashboardSection from "../components/DashboardSection";
import EntriesVsExitsChart from "../components/EntriesVsExitsChart";
import MovementsByTypeChart from "../components/MovementsByTypeChart";

function Dashboard() {

    const [dashboard, setDashboard] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getDashboard();

                setDashboard(data);

            } catch (error) {

                console.error(error);

                setError(
                    "Error al cargar el dashboard"
                );

            } finally {

                setLoading(false);
            }
        };

        loadDashboard();

    }, []);

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
                loading ? (

                    <p>
                        Cargando dashboard...
                    </p>

                ) : !dashboard ? (

                    <p>
                        No hay datos disponibles para mostrar.
                    </p>

                ) : (

                    <>

                        <DashboardKpiGrid>

                            <DashboardKpiCard
                                title="Productos"
                                value={dashboard.totalProducts}
                                description="Productos registrados"
                                variant="products"
                            />

                            <DashboardKpiCard
                                title="Categorías"
                                value={dashboard.totalCategories}
                                description="Categorías registradas"
                                variant="categories"
                            />

                            <DashboardKpiCard
                                title="Proveedores"
                                value={dashboard.totalSuppliers}
                                description="Proveedores registrados"
                                variant="suppliers"
                            />

                            <DashboardKpiCard
                                title="Movimientos"
                                value={dashboard.totalMovements}
                                description="Movimientos registrados"
                                variant="movements"
                            />

                            <DashboardKpiCard
                                title="Entradas"
                                value={dashboard.totalEntries}
                                description="Movimientos de entrada"
                                variant="entries"
                            />

                            <DashboardKpiCard
                                title="Salidas"
                                value={dashboard.totalExits}
                                description="Movimientos de salida"
                                variant="exits"
                            />

                            <DashboardKpiCard
                                title="Stock total"
                                value={dashboard.totalStock}
                                description="Unidades en inventario"
                                variant="stock"
                            />

                        </DashboardKpiGrid>

                        <DashboardSection title="Entradas vs salidas">
                            <EntriesVsExitsChart
                                totalEntries={dashboard.totalEntries ?? 0}
                                totalExits={dashboard.totalExits ?? 0}
                            />
                        </DashboardSection>

                        <DashboardSection title="Movimientos por tipo">
                            <MovementsByTypeChart
                                totalMovements={dashboard.totalMovements ?? 0}
                                totalEntries={dashboard.totalEntries ?? 0}
                                totalExits={dashboard.totalExits ?? 0}
                            />
                        </DashboardSection>

                    </>
                )
            }

        </div>
    );
}

export default Dashboard;