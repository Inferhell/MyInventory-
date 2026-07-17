function SearchInput({
    value,
    onChange,
    placeholder = "Buscar..."
}) {

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(event) =>
                onChange(event.target.value)
            }
            style={{
                padding: "7px 10px",
                minWidth: "240px",
                marginRight: "10px"
            }}
        />
    );
}

export default SearchInput;