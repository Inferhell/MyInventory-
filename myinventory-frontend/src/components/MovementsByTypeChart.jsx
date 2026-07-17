import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";

function MovementsByTypeChart({
    totalMovements = 0,
    totalEntries = 0,
    totalExits = 0
}) {

    const totalInitialBalance =
        Math.max(
            Number(totalMovements) -
            Number(totalEntries) -
            Number(totalExits),
            0
        );

    const data = [
        {
            name: "Entradas",
            value: Number(totalEntries)
        },
        {
            name: "Salidas",
            value: Number(totalExits)
        },
        {
            name: "Saldo inicial",
            value: totalInitialBalance
        }
    ].filter(item => item.value > 0);

    const colors = [
        "#2e7d32",
        "#c62828",
        "#1976d2"
    ];

    if (data.length === 0) {
        return (
            <p>
                No hay movimientos suficientes para mostrar el gráfico.
            </p>
        );
    }

    return (
        <div style={{
            width: "100%",
            height: "280px"
        }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                    >
                        {
                            data.map((entry, index) => (
                                <Cell
                                    key={entry.name}
                                    fill={colors[index % colors.length]}
                                />
                            ))
                        }
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MovementsByTypeChart;