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
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
    };

    const dialogStyle = {
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)"
    };

    const actionsStyle = {
        display: "flex",
        justifyContent: "flex-end",
        gap: "8px",
        marginTop: "20px"
    };

    return (
        <div style={overlayStyle}>
            <div style={dialogStyle}>

                <h3>
                    {title}
                </h3>

                <p>
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