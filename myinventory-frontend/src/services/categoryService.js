import axios from "axios";

const API_URL =
    "http://localhost:8080/categories";

export const getCategories =
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

export const createCategory =
    async (category) => {

        const response =
            await axios.post(
                API_URL,
                category,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const updateCategory =
    async (
        id,
        category
    ) => {

        const response =
            await axios.put(
                `${API_URL}/${id}`,
                category,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const disableCategory =
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

export const enableCategory =
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