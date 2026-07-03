import axios from "axios";

const API_URL =
    "http://localhost:8080/suppliers";

export const getSuppliers =
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

export const createSupplier =
    async (supplier) => {

        const response =
            await axios.post(
                API_URL,
                supplier,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const updateSupplier =
    async (
        id,
        supplier
    ) => {

        const response =
            await axios.put(
                `${API_URL}/${id}`,
                supplier,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const disableSupplier =
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

export const enableSupplier =
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