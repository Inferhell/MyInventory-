function DashboardSection({
    title,
    children
}) {

    return (
        <section style={{
            marginTop: "32px"
        }}>
            <h2 style={{
                marginBottom: "14px"
            }}>
                {title}
            </h2>

            <div style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                padding: "24px",
                boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.03), 0 2px 4px -2px rgba(15, 23, 42, 0.03)",
                border: "1px solid #f1f5f9"
            }}>
                {children}
            </div>
        </section>
    );
}

export default DashboardSection;