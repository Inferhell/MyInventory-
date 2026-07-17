export function formatRole(role) {

    const roles = {
        ADMIN: "Administrador",
        SUPERVISOR: "Supervisor",
        EMPLOYEE: "Empleado"
    };

    return roles[role] || role || "-";
}