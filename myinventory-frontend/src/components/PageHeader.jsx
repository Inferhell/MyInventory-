function PageHeader({
    title,
    subtitle
}) {

    return (
        <div style={{ marginBottom: "16px" }}>

            <h1 style={{ marginBottom: "4px" }}>
                {title}
            </h1>

            {
                subtitle && (
                    <p style={{
                        marginTop: 0,
                        color: "var(--color-text-soft)"
                    }}>
                        {subtitle}
                    </p>
                )
            }

        </div>
    );
}

export default PageHeader;