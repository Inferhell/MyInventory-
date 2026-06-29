export function getApiErrorMessage(
    error,
    defaultMessage = "Ocurrió un error inesperado"
) {

    const data =
        error.response?.data;

    if (!data) {

        return (
            error.message ||
            defaultMessage
        );
    }

    if (typeof data === "string") {
        return data;
    }

    if (data.detail) {
        return data.detail;
    }

    if (data.message) {
        return data.message;
    }

    if (data.error) {
        return data.error;
    }

    if (data.title) {
        return data.title;
    }

    if (
        data.fields &&
        typeof data.fields === "object"
    ) {

        return Object.values(data.fields)
                .join(" ");
    }

    return defaultMessage;
}