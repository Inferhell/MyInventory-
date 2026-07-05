import {
    apiClient
} from "./apiClient";

export const getProducts =
    async () => {

        const response =
            await apiClient.get(
                "/products"
            );

        return response.data;
    };

export const createProduct =
    async (product) => {

        const response =
            await apiClient.post(
                "/products",
                product
            );

        return response.data;
    };

export const updateProduct =
    async (id, product) => {

        const response =
            await apiClient.put(
                `/products/${id}`,
                product
            );

        return response.data;
    };

export const disableProduct =
    async (id) => {

        const response =
            await apiClient.patch(
                `/products/${id}/disable`
            );

        return response.data;
    };

export const enableProduct =
    async (id) => {

        const response =
            await apiClient.patch(
                `/products/${id}/enable`
            );

        return response.data;
    };
