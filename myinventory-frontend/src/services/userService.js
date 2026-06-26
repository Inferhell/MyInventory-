import axios from "axios";

const API_URL =
    "http://localhost:8080/users";

export const getUsers =
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

export const createUser =
    async (user) => {

        const response =
            await axios.post(
                API_URL,
                user,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const updateUser =
    async (id, user) => {

        const response =
            await axios.put(
                `${API_URL}/${id}`,
                user,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const disableUser =
    async (id) => {

        const response =
            await axios.delete(
                `${API_URL}/${id}`,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };


    export const enableUser =
    async (id) => {

        const response =
            await axios.put(
                `${API_URL}/${id}/enable`,
                {},
                {
                    withCredentials: true
                }
            );

        return response.data;
    };