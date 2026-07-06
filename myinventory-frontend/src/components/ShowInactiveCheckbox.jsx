function ShowInactiveCheckbox({
    checked,
    onChange
}) {

    return (
        <label>
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) =>
                    onChange(event.target.checked)
                }
            />

            {" "}
            Mostrar inactivos
        </label>
    );
}

export default ShowInactiveCheckbox;
