import Badge from "./Badge";

import {
    formatRole
} from "../utils/formatRole";

function RoleBadge({
    role
}) {

    const variantByRole = {
        ADMIN: "danger",
        SUPERVISOR: "info",
        EMPLOYEE: "neutral"
    };

    return (
        <Badge variant={variantByRole[role] || "default"}>
            {formatRole(role)}
        </Badge>
    );
}

export default RoleBadge;