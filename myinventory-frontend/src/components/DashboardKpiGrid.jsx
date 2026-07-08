function DashboardKpiGrid({
    children
}) {

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "24px"
        }}>
            {children}
        </div>
    );
}

export default DashboardKpiGrid;