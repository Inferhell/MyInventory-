import axios from "axios";

const API_URL =
    "http://localhost:8080/products";

export const getProducts =
    async () => {

        const response =
            await axios.get(
                API_URL,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const createProduct =
    async (product) => {

        const response =
            await axios.post(
                API_URL,
                product,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const updateProduct =
    async (id, product) => {

        const response =
            await axios.put(
                `${API_URL}/${id}`,
                product,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const disableProduct =
    async (id) => {

        const response =
            await axios.patch(
                `${API_URL}/${id}/disable`,
                {},
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const enableProduct =
    async (id) => {

        const response =
            await axios.patch(
                `${API_URL}/${id}/enable`,
                {},
                {
                    withCredentials: true
                }
            );

        return response.data;
    };