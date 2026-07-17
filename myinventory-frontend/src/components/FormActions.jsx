function FormActions({
    children
}) {

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
            marginTop: "18px",
            marginBottom: "24px"
        }}>
            {children}
        </div>
    );
}

export default FormActions;