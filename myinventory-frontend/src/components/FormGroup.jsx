function FormGroup({
    label,
    children
}) {

    return (
        <div style={{
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "7px"
        }}>
            {
                label && (
                    <label style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#334155"
                    }}>
                        {label}
                    </label>
                )
            }

            {children}
        </div>
    );
}

export default FormGroup;