import axios from "axios";

const API_URL =
    "http://localhost:8080/movements";

export const getMovements =
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

export const registerEntry =
    async (movementData) => {

        const response =
            await axios.post(
                `${API_URL}/entry`,
                movementData,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const registerExit =
    async (movementData) => {

        const response =
            await axios.post(
                `${API_URL}/exit`,
                movementData,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };