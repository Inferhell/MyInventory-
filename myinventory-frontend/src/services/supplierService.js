import {
    apiClient
} from "./apiClient";

export const getSuppliers =
    async () => {

        const response =
            await apiClient.get(
                "/suppliers"
            );

        return response.data;
    };

export const createSupplier =
    async (supplier) => {

        const response =
            await apiClient.post(
                "/suppliers",
                supplier
            );

        return response.data;
    };

export const updateSupplier =
    async (
        id,
        supplier
    ) => {

        const response =
            await apiClient.put(
                `/suppliers/${id}`,
                supplier
            );

        return response.data;
    };

export const disableSupplier =
    async (id) => {

        const response =
            await apiClient.patch(
                `/suppliers/${id}/disable`
            );

        return response.data;
    };

export const enableSupplier =
    async (id) => {

        const response =
            await apiClient.patch(
                `/suppliers/${id}/enable`
            );

        return response.data;
    };
