function FilterSelect({
    label,
    value,
    onChange,
    options = []
}) {

    return (
        <label style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            fontSize: "13px",
            fontWeight: "600",
            color: "#334155"
        }}>
            {label}

            <select
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                style={{
                    minWidth: "190px"
                }}
            >
                {
                    options.map(option => (

                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))
                }
            </select>
        </label>
    );
}

export default FilterSelect;