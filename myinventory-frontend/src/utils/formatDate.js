export function formatDate(date) {

    if (!date) {
        return "-";
    }

    return new Intl.DateTimeFormat("es-CO", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(new Date(date));
}