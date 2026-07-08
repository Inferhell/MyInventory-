function FormGroup({
    label,
    children
}) {

    return (
        <div style={{
            marginBottom: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "6px"
        }}>
            {
                label && (
                    <label style={{
                        fontWeight: "600",
                        color: "#334e68"
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