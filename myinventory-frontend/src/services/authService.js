import axios from "axios";

const API_URL =
    "http://localhost:8080";

export const login = async (
    email,
    password
) => {

    const params =
        new URLSearchParams();

    params.append(
        "username",
        email
    );

    params.append(
        "password",
        password
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

    return response;
};

export const getCurrentUser =
    async () => {

        const response =
            await axios.get(
                `${API_URL}/me`,
                {
                    withCredentials: true
                }
            );

        return response.data;
    };

export const logout =
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