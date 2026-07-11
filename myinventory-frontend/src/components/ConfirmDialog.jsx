import ActionButton from "./ActionButton";

function ConfirmDialog({
    isOpen,
    title = "Confirmar acción",
    message = "¿Estás seguro?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    variant = "danger",
    loading = false,
    onConfirm,
    onCancel
}) {

    if (!isOpen) {
        return null;
    }

    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(2, 6, 23, 0.62)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px"
    };

    const dialogStyle = {
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text-soft)",
        padding: "26px",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "440px",
        border: "1px solid var(--color-border)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.28), 0 8px 10px -6px rgba(0, 0, 0, 0.22)"
    };

    const titleStyle = {
        marginTop: 0,
        marginBottom: "10px",
        color: "var(--color-text)",
        fontSize: "20px",
        fontWeight: "800"
    };

    const messageStyle = {
        margin: 0,
        color: "var(--color-text-soft)",
        fontSize: "14px",
        lineHeight: 1.6
    };

    const actionsStyle = {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "24px"
    };

    return (
        <div style={overlayStyle}>
            <div style={dialogStyle}>

                <h3 style={titleStyle}>
                    {title}
                </h3>

                <p style={messageStyle}>
                    {message}
                </p>

                <div style={actionsStyle}>

                    <ActionButton
                        variant="secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </ActionButton>

                    <ActionButton
                        variant={variant}
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {confirmText}
                    </ActionButton>

                </div>

            </div>
        </div>
    );
}

export default ConfirmDialog;