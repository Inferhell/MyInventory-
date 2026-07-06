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
            backgroundColor: "#1976d2",
            color: "#ffffff",
            border: "1px solid #1565c0"
        },
        secondary: {
            backgroundColor: "#f5f5f5",
            color: "#212121",
            border: "1px solid #bdbdbd"
        },
        success: {
            backgroundColor: "#2e7d32",
            color: "#ffffff",
            border: "1px solid #1b5e20"
        },
        danger: {
            backgroundColor: "#c62828",
            color: "#ffffff",
            border: "1px solid #b71c1c"
        },
        warning: {
            backgroundColor: "#f9a825",
            color: "#212121",
            border: "1px solid #f57f17"
        }
    };

    const style = {
        padding: "7px 12px",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        marginRight: "6px",
        marginBottom: "6px",
        width: fullWidth ? "100%" : "auto",
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