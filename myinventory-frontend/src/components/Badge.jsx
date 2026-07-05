function Badge({
    children,
    variant = "default"
}) {

    const variants = {
        success: {
            backgroundColor: "#e8f5e9",
            color: "#1b5e20",
            border: "1px solid #81c784"
        },
        danger: {
            backgroundColor: "#ffebee",
            color: "#b71c1c",
            border: "1px solid #e57373"
        },
        warning: {
            backgroundColor: "#fff8e1",
            color: "#795548",
            border: "1px solid #ffd54f"
        },
        info: {
            backgroundColor: "#e3f2fd",
            color: "#0d47a1",
            border: "1px solid #64b5f6"
        },
        neutral: {
            backgroundColor: "#f5f5f5",
            color: "#424242",
            border: "1px solid #bdbdbd"
        },
        default: {
            backgroundColor: "#eeeeee",
            color: "#212121",
            border: "1px solid #bdbdbd"
        }
    };

    const style = {
        display: "inline-block",
        padding: "4px 8px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: "600",
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