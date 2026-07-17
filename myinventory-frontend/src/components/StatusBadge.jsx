import Badge from "./Badge";

function StatusBadge({
    active
}) {

    return active ? (
        <Badge variant="success">
            Activo
        </Badge>
    ) : (
        <Badge variant="danger">
            Inactivo
        </Badge>
    );
}

export default StatusBadge;