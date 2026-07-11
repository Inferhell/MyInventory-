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
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    boxShadow: "var(--shadow-soft)",
    borderRadius: "14px",
    padding: "24px",
    borderTop: `4px solid ${variants[variant] || variants.default}`,
    transition: "all .2s ease"
};

const titleStyle = {
    margin: 0,
    color: "var(--color-muted)",
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em"
};

const valueStyle = {
    margin: "12px 0 8px",
    color: "var(--color-text)",
    fontSize: "32px",
    fontWeight: 800,
    letterSpacing: "-0.04em"
};

const descriptionStyle = {
    margin: 0,
    color: "var(--color-text-soft)",
    fontSize: "13px",
    fontWeight: 500
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