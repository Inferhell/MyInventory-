function Badge({
    children,
    variant = "default"
}) {

    const variants = {
        success: {
            backgroundColor: "#dcfce7",
            color: "#166534"
        },
        danger: {
            backgroundColor: "#fee2e2",
            color: "#991b1b"
        },
        warning: {
            backgroundColor: "#fef3c7",
            color: "#92400e"
        },
        info: {
            backgroundColor: "#dbeafe",
            color: "#1e40af"
        },
        neutral: {
            backgroundColor: "#f1f5f9",
            color: "#475569"
        },
        default: {
            backgroundColor: "#f1f5f9",
            color: "#334155"
        }
    };

    const style = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px 10px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: "700",
        lineHeight: "1",
        whiteSpace: "nowrap",
        ...variants[variant]
    };

    return (
        <span style={style}>
            {children}
        </span>
    );
}

export default Badge;