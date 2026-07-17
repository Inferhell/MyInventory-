function TableActions({
    children
}) {

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            minWidth: "150px"
        }}>
            {children}
        </div>
    );
}

export default TableActions;