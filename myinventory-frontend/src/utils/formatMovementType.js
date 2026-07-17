export function formatMovementType(type) {

    const types = {
        ENTRY: "Entrada",
        EXIT: "Salida",
        INITIAL_BALANCE: "Saldo inicial"
    };

    return types[type] || type || "-";
}