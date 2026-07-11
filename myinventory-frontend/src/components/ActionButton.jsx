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
        backgroundColor: "#4f46e5",
        color: "#ffffff"
    },
    secondary: {
        backgroundColor: "#ffffff",
        color: "#334155",
        border: "1px solid #e2e8f0"
    },
    success: {
        backgroundColor: "#16a34a",
        color: "#ffffff"
    },
    danger: {
        backgroundColor: "#dc2626",
        color: "#ffffff"
    },
    warning: {
        backgroundColor: "#f59e0b",
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