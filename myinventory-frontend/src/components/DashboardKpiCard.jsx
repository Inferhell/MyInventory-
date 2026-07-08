function DashboardKpiCard({
    title,
    value,
    description,
    variant = "default"
}) {

    const variants = {
        products: "#1976d2",
        categories: "#7b1fa2",
        suppliers: "#00897b",
        movements: "#5d4037",
        entries: "#2e7d32",
        exits: "#c62828",
        stock: "#f9a825",
        default: "#607d8b"
    };

    const cardStyle = {
        backgroundColor: "#ffffff",
        border: "1px solid #d9e2ec",
        borderRadius: "10px",
        padding: "18px",
        boxShadow: "0 2px 8px rgba(16, 42, 67, 0.06)",
        borderTop: `4px solid ${variants[variant] || variants.default}`
    };

    const titleStyle = {
        margin: 0,
        color: "#627d98",
        fontSize: "14px",
        fontWeight: "700"
    };

    const valueStyle = {
        margin: "10px 0 6px",
        color: "#102a43",
        fontSize: "30px",
        fontWeight: "800"
    };

    const descriptionStyle = {
        margin: 0,
        color: "#829ab1",
        fontSize: "13px"
    };

    return (
        <div style={cardStyle}>
            <p style={titleStyle}>
                {title}
            </p>

            <p style={valueStyle}>
                {
                    value ?? 0
                }
            </p>

            {
                description && (
                    <p style={descriptionStyle}>
                        {description}
                    </p>
                )
            }
        </div>
    );
}

export default DashboardKpiCard;