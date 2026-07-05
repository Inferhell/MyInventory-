import {
    apiClient
} from "./apiClient";

export const getCategories =
    async () => {

        const response =
            await apiClient.get(
                "/categories"
            );

        return response.data;
    };

export const createCategory =
    async (category) => {

        const response =
            await apiClient.post(
                "/categories",
                category
            );

        return response.data;
    };

export const updateCategory =
    async (
        id,
        category
    ) => {

        const response =
            await apiClient.put(
                `/categories/${id}`,
                category
            );

        return response.data;
    };

export const disableCategory =
    async (id) => {

        const response =
            await apiClient.patch(
                `/categories/${id}/disable`
            );

        return response.data;
    };

export const enableCategory =
    async (id) => {

        const response =
            await apiClient.patch(
                `/categories/${id}/enable`
            );

        return response.data;
    };
