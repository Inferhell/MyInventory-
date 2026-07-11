function DashboardKpiCard({
    title,
    value,
    description,
    variant = "default"
}) {

    const variants = {
        products: "#4f46e5",
        categories: "#7c3aed",
        suppliers: "#0f766e",
        movements: "#475569",
        entries: "#16a34a",
        exits: "#dc2626",
        stock: "#d97706",
        default: "#64748b"
    };

    const cardStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        padding: "24px",
        boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.03), 0 2px 4px -2px rgba(15, 23, 42, 0.03)",
        border: "1px solid #f1f5f9",
        borderTop: `4px solid ${variants[variant] || variants.default}`
    };

    const titleStyle = {
        margin: 0,
        color: "#64748b",
        fontSize: "13px",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.04em"
    };

    const valueStyle = {
        margin: "12px 0 8px",
        color: "#0f172a",
        fontSize: "32px",
        fontWeight: "800",
        letterSpacing: "-0.04em"
    };

   const descriptionStyle = {
    margin: 0,
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "500"
};

    return (
        <div style={cardStyle}>
            <p style={titleStyle}>
                {title}
            </p>

            <p style={valueStyle}>
                {value ?? 0}
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