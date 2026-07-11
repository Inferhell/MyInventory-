function TableToolbar({
    children
}) {

    return (
        <div style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "16px",
            flexWrap: "wrap",
            marginTop: "18px",
            marginBottom: "18px"
        }}>
            {children}
        </div>
    );
}

export default TableToolbar;