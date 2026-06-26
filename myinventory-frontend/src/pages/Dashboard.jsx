import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const data = await getDashboard();
                
                console.log(data);

                setDashboard(data);

            } catch (error) {

                console.error(error);
            }
        };

        loadDashboard();

    }, []);

    if (!dashboard) {

        return <p>Cargando dashboard...</p>;
    }

    return (

        
        <div>
            <h1>Dashboard</h1>

            <p>Total Productos: {dashboard.totalProducts}</p>

            <p>Total Categorías: {dashboard.totalCategories}</p>

            <p>Total Proveedores: {dashboard.totalSuppliers}</p>

            <p>Total Movimientos: {dashboard.totalMovements}</p>

            <p>Total Entradas: {dashboard.totalEntries}</p>

            <p>Total Salidas: {dashboard.totalExits}</p>

            <p>Stock Total: {dashboard.totalStock}</p>

        </div>
    );
}

export default Dashboard;