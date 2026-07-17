import {
    apiClient
} from "./apiClient";

export const getMovements =
    async () => {

        const response =
            await apiClient.get(
                "/movements"
            );

        return response.data;
    };

export const registerEntry =
    async (movementData) => {

        const response =
            await apiClient.post(
                "/movements/entry",
                movementData
            );

        return response.data;
    };

export const registerExit =
    async (movementData) => {

        const response =
            await apiClient.post(
                "/movements/exit",
                movementData
            );

        return response.data;
    };
