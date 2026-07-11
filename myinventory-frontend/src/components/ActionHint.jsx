function ActionHint({
    children
}) {

    return (
        <span style={{
            flexBasis: "100%",
            fontSize: "12px",
            color: "#64748b"
        }}>
            {children}
        </span>
    );
}

export default ActionHint;