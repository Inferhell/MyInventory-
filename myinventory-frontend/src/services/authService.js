import axios from "axios";

const API_URL =
    "http://localhost:8080";

export const loginRequest =
    async (credentials) => {

        const params =
            new URLSearchParams();

        params.append(
            "username",
            credentials.email
        );

        params.append(
            "password",
            credentials.password
        );

        const response =
            await axios.post(
                `${API_URL}/login`,
                params,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    }
                }
            );

        return response.data;
    };

export const logoutRequest =
    async () => {

        const response =
            await axios.post(
                `${API_URL}/logout`,
                {},
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const getCurrentUser =
    async () => {

        const response =
            await axios.get(
                `${API_URL}/auth/me`,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };