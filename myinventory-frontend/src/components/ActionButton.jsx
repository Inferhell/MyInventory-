function ActionButton({
    children,
    variant = "primary",
    type = "button",
    onClick,
    disabled = false,
    title,
    fullWidth = false
}) {

const variants = {
    primary: {
        backgroundColor: "var(--color-primary)",
        color: "#ffffff"
    },
    secondary: {
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text-soft)",
        border: "1px solid var(--color-border)"
    },
    success: {
        backgroundColor: "var(--color-success)",
        color: "#ffffff"
    },
    danger: {
        backgroundColor: "var(--color-danger)",
        color: "#ffffff"
    },
    warning: {
        backgroundColor: "var(--color-warning)",
        color: "#ffffff"
    }
};

const style = {
    padding: "6px 11px",
    borderRadius: "6px",
    border: variants[variant]?.border || "none",
    fontSize: "13px",
    fontWeight: "600",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? "100%" : "auto",
    boxShadow: disabled
        ? "none"
        : "0 1px 2px rgba(15, 23, 42, 0.08)",
    transition:
        "transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease",
    ...variants[variant]
};

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            title={title}
            style={style}
        >
            {children}
        </button>
    );
}

export default ActionButton;