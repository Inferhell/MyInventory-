function AlertMessage({
    type = "info",
    message
}) {

    if (!message) {
        return null;
    }

    const stylesByType = {
        success: {
            backgroundColor: "#e8f5e9",
            border: "1px solid #81c784",
            color: "#1b5e20"
        },
        error: {
            backgroundColor: "#ffebee",
            border: "1px solid #e57373",
            color: "#b71c1c"
        },
        warning: {
            backgroundColor: "#fff8e1",
            border: "1px solid #ffd54f",
            color: "#795548"
        },
        info: {
            backgroundColor: "#e3f2fd",
            border: "1px solid #64b5f6",
            color: "#0d47a1"
        }
    };

    const style = {
        padding: "10px 12px",
        borderRadius: "6px",
        marginBottom: "12px",
        fontSize: "14px",
        ...stylesByType[type]
    };

    return (
        <div
            role={type === "error" ? "alert" : "status"}
            style={style}
        >
            {message}
        </div>
    );
}

export default AlertMessage;