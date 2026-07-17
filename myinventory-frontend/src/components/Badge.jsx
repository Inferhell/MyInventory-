function Badge({
    children,
    variant = "default"
}) {

const variants = {
    success: {
        backgroundColor: "var(--badge-success-bg)",
        color: "var(--badge-success-text)"
    },
    danger: {
        backgroundColor: "var(--badge-danger-bg)",
        color: "var(--badge-danger-text)"
    },
    warning: {
        backgroundColor: "var(--badge-warning-bg)",
        color: "var(--badge-warning-text)"
    },
    info: {
        backgroundColor: "var(--badge-info-bg)",
        color: "var(--badge-info-text)"
    },
    neutral: {
        backgroundColor: "var(--badge-neutral-bg)",
        color: "var(--badge-neutral-text)"
    },
    default: {
        backgroundColor: "var(--badge-neutral-bg)",
        color: "var(--badge-neutral-text)"
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