function TableContainer({
    children
}) {

    return (
        <div style={{
            width: "100%",
            overflowX: "auto",
            borderRadius: "8px",
            border: "1px solid #d9e2ec",
            backgroundColor: "#ffffff"
        }}>
            {children}
        </div>
    );
}

export default TableContainer;