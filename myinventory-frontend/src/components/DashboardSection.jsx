function DashboardSection({
    title,
    children
}) {

    return (
        <section style={{
            marginTop: "24px"
        }}>
            <h2>
                {title}
            </h2>

            <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #d9e2ec",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(16, 42, 67, 0.06)"
            }}>
                {children}
            </div>
        </section>
    );
}

export default DashboardSection;