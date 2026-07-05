export function formatCurrency(value) {

    if (value === null || value === undefined || value === "") {
        return "-";
    }

    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP"
    }).format(Number(value));
}