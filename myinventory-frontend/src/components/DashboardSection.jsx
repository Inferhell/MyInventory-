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
                backgroundColor: "var(--color-surface)",
                borderRadius: "14px",
                padding: "24px",
                boxShadow: "var(--shadow-soft)",
                border: "1px solid var(--color-border-soft)"
            }}>
                {children}
            </div>
        </section>
    );
}

export default DashboardSection;