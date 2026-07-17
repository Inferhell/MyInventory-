export function formatStock(stock) {

    const numericStock =
        Number(stock);

    if (numericStock <= 0) {
        return "Agotado";
    }

    if (numericStock <= 5) {
        return `Bajo (${numericStock})`;
    }

    return `Normal (${numericStock})`;
}