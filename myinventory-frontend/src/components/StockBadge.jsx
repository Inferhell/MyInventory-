import Badge from "./Badge";

function StockBadge({
    stock
}) {

    const numericStock =
        Number(stock);

    if (numericStock <= 0) {
        return (
            <Badge variant="danger">
                Agotado
            </Badge>
        );
    }

    if (numericStock <= 5) {
        return (
            <Badge variant="warning">
                Bajo ({numericStock})
            </Badge>
        );
    }

    return (
        <Badge variant="success">
            Normal ({numericStock})
        </Badge>
    );
}

export default StockBadge;