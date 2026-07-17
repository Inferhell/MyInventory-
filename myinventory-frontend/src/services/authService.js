import {
    apiClient
} from "./apiClient";

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
            await apiClient.post(
                "/login",
                params,
                {
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
            await apiClient.post(
                "/logout"
            );

        return response.data;
    };

export const getCurrentUser =
    async () => {

        const response =
            await apiClient.get(
                "/auth/me"
            );

        return response.data;
    };
