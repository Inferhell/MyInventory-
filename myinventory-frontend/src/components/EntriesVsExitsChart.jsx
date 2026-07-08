import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

function EntriesVsExitsChart({
    totalEntries = 0,
    totalExits = 0
}) {

    const data = [
        {
            name: "Entradas",
            cantidad: totalEntries
        },
        {
            name: "Salidas",
            cantidad: totalExits
        }
    ];

    return (
        <div style={{
            width: "100%",
            height: "280px"
        }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar
                        dataKey="cantidad"
                        fill="#1976d2"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default EntriesVsExitsChart;