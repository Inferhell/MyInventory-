import Badge from "./Badge";

import {
    formatMovementType
} from "../utils/formatMovementType";

function MovementTypeBadge({
    type
}) {

    const variantByType = {
        ENTRY: "success",
        EXIT: "danger",
        INITIAL_BALANCE: "info"
    };

    return (
        <Badge variant={variantByType[type] || "default"}>
            {formatMovementType(type)}
        </Badge>
    );
}

export default MovementTypeBadge;