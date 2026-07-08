function FormActions({
    children
}) {

    return (
        <div style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            marginTop: "16px",
            marginBottom: "20px"
        }}>
            {children}
        </div>
    );
}

export default FormActions;